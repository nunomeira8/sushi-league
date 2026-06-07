'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getPendingGameScores, removePendingGameScores, savePendingGameScores } from '@/lib/gameScoreStorage';
import { getPlayerId } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

const SYNC_DEBOUNCE_MS = 2000;
const SYNC_INTERVAL_MS = 15000;

export function useBufferedScores(roomCode: string) {
  const [scores, setScores] = useState<Record<string, number>>({});

  const scoresRef = useRef<Record<string, number>>({});
  const dirtyCategoriesRef = useRef(new Set<string>());
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncPromiseRef = useRef<Promise<boolean> | null>(null);

  const persistPendingScores = useCallback(() => {
    const playerId = getPlayerId();
    const dirtyCategories = [...dirtyCategoriesRef.current];

    if (!playerId) return;

    if (dirtyCategories.length === 0) {
      removePendingGameScores(roomCode, playerId);
      return;
    }

    savePendingGameScores(roomCode, playerId, {
      scores: scoresRef.current,
      dirtyCategories,
    });
  }, [roomCode]);

  const flushScores = useCallback(async (): Promise<boolean> => {
    const playerId = getPlayerId();

    if (!playerId) return false;

    while (dirtyCategoriesRef.current.size > 0) {
      if (syncPromiseRef.current) {
        const activeSyncSucceeded = await syncPromiseRef.current;

        if (!activeSyncSucceeded) return false;

        continue;
      }

      const categories = [...dirtyCategoriesRef.current];
      const scoreSnapshot = Object.fromEntries(
        categories.map((category) => [category, scoresRef.current[category] ?? 0]),
      );

      const syncPromise = Promise.all(
        categories.map((category) =>
          supabase
            .from('player_scores')
            .update({ score: scoreSnapshot[category] })
            .eq('player_id', playerId)
            .eq('category', category),
        ),
      )
        .then((results) => {
          const errors = results.map((result) => result.error).filter(Boolean);

          if (errors.length > 0) {
            console.error('SCORE SYNC ERRORS', errors);
            return false;
          }

          categories.forEach((category) => {
            if (scoresRef.current[category] === scoreSnapshot[category]) {
              dirtyCategoriesRef.current.delete(category);
            }
          });

          persistPendingScores();
          return true;
        })
        .catch((error) => {
          console.error('SCORE SYNC ERROR', error);
          return false;
        });

      syncPromiseRef.current = syncPromise;

      const success = await syncPromise;

      if (syncPromiseRef.current === syncPromise) {
        syncPromiseRef.current = null;
      }

      if (!success) return false;
    }

    return true;
  }, [persistPendingScores]);

  const scheduleSync = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      void flushScores();
    }, SYNC_DEBOUNCE_MS);
  }, [flushScores]);

  const changeScore = useCallback(
    (category: string, amount: number) => {
      const currentValue = scoresRef.current[category] ?? 0;
      const nextValue = Math.max(0, currentValue + amount);

      if (nextValue === currentValue) return;

      scoresRef.current = {
        ...scoresRef.current,
        [category]: nextValue,
      };
      dirtyCategoriesRef.current.add(category);

      setScores(scoresRef.current);
      persistPendingScores();
      scheduleSync();
    },
    [persistPendingScores, scheduleSync],
  );

  useEffect(() => {
    let isActive = true;

    async function loadScores() {
      const playerId = getPlayerId();

      if (!playerId) return;

      const { data, error } = await supabase.from('player_scores').select('*').eq('player_id', playerId);
      const databaseScores: Record<string, number> = {};

      if (error) {
        console.error('SCORE LOAD ERROR', error);
      }

      data?.forEach((item) => {
        databaseScores[item.category] = item.score;
      });

      const pendingScores = getPendingGameScores(roomCode, playerId);
      const recoveredScores = { ...databaseScores };

      pendingScores?.dirtyCategories.forEach((category) => {
        recoveredScores[category] = pendingScores.scores[category] ?? databaseScores[category] ?? 0;
        dirtyCategoriesRef.current.add(category);
      });

      if (!isActive) return;

      scoresRef.current = recoveredScores;
      setScores(recoveredScores);

      if (dirtyCategoriesRef.current.size > 0) {
        void flushScores();
      }
    }

    void loadScores();

    return () => {
      isActive = false;
    };
  }, [flushScores, roomCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      void flushScores();
    }, SYNC_INTERVAL_MS);

    function syncWhenHidden() {
      if (document.visibilityState === 'hidden') {
        void flushScores();
      }
    }

    function syncBeforeLeaving() {
      void flushScores();
    }

    document.addEventListener('visibilitychange', syncWhenHidden);
    window.addEventListener('pagehide', syncBeforeLeaving);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', syncWhenHidden);
      window.removeEventListener('pagehide', syncBeforeLeaving);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [flushScores]);

  return {
    scores,
    changeScore,
    flushScores,
  };
}
