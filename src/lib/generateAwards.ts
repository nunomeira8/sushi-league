import { supabase } from '@/lib/supabase';

const CATEGORY_WEIGHTS: Record<string, number> = {
    starters: 1,
    sushi: 1,
    sashimi: 1,
    temaki: 3,
    hot_dishes: 3,
};

function getRank(
    leaderboard: {
        score: number;
        finished_at: number | null;
    }[],
    index: number,
) {
    if (index === 0) return 1;

    const previous = leaderboard[index - 1];
    const current = leaderboard[index];

    if (
        previous.score === current.score &&
        previous.finished_at === current.finished_at
    ) {
        return getRank(leaderboard, index - 1);
    }

    return index + 1;
}

function getFinalRank(
    leaderboard: {
        total_score: number;
        finished_at: number | null;
    }[],
    index: number,
) {
    if (index === 0) return 1;

    const previous = leaderboard[index - 1];
    const current = leaderboard[index];

    if (
        previous.total_score === current.total_score &&
        previous.finished_at === current.finished_at
    ) {
        return getFinalRank(leaderboard, index - 1);
    }

    return index + 1;
}

export async function generateAwards(roomId: string) {
    const { data: existingAwards } = await supabase
        .from('room_awards')
        .select('id')
        .eq('room_id', roomId)
        .limit(1);

    if (existingAwards?.length) {
        return;
    }

    const { data: players } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', roomId);

    if (!players?.length) return;

    const { data: scores } = await supabase
        .from('player_scores')
        .select('*')
        .in(
            'player_id',
            players.map((p) => p.id),
        );

    if (!scores?.length) return;

    const playersById = new Map(players.map((player) => [player.id, player]));

    const categories = [...new Set(scores.map((score) => score.category))];

    const awardsToInsert = [];

    const finalScores: Record<
        string,
        {
            player: typeof players[number];
            total: number;
            breakdown: Record<string, number>;
        }
    > = {};

    for (const player of players) {
        finalScores[player.id] = {
            player,
            total: 0,
            breakdown: {},
        };
    }

    for (const category of categories) {
        const scoresInCategory = scores.filter((score) => score.category === category);
        const hasWinner = scoresInCategory.some((score) => score.score > 0);
        const categoryScores = scoresInCategory.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }

            const playerA = playersById.get(a.player_id);
            const playerB = playersById.get(b.player_id);

            if (!hasWinner) {
                return (playerA?.name || '').localeCompare(playerB?.name || '');
            }

            const finishedAtA = playerA?.finished_at ?? -1;
            const finishedAtB = playerB?.finished_at ?? -1;

            if (finishedAtB !== finishedAtA) {
                return finishedAtB - finishedAtA;
            }

            return (playerA?.name || '').localeCompare(playerB?.name || '');
        });

        if (!categoryScores.length) continue;

        const leaderboardWithoutRanks = categoryScores.map((score) => {
            const player = playersById.get(score.player_id);

            const weightedScore =
                score.score * (CATEGORY_WEIGHTS[category] || 1);

            if (player) {
                finalScores[player.id].total += weightedScore;
                finalScores[player.id].breakdown[category] = score.score;
            }

            return {
                player_id: score.player_id,
                player_name: player?.name || 'Unknown',
                score: score.score,
                finished_at: player?.finished_at ?? null,
            };
        });

        const leaderboard = leaderboardWithoutRanks.map((player, index) => ({
            ...player,
            rank: hasWinner ? getRank(leaderboardWithoutRanks, index) : null,
        }));

        const winners = leaderboard.filter((player) => player.rank === 1);
        const winner = winners[0];

        awardsToInsert.push({
            room_id: roomId,
            category,
            winner_player_id: hasWinner ? (winner?.player_id ?? null) : null,
            winner_player_name: hasWinner
                ? winners.map((player) => player.player_name).join(' / ')
                : '',
            winner_score: hasWinner ? (winner?.score ?? 0) : 0,
            leaderboard_json: leaderboard,
            is_final_winner: false,
        });
    }

    const finalLeaderboard = Object.values(finalScores)
        .sort((a, b) => {
            if (b.total !== a.total) {
                return b.total - a.total;
            }

            const finishedAtA = a.player.finished_at ?? -1;
            const finishedAtB = b.player.finished_at ?? -1;

            if (finishedAtB !== finishedAtA) {
                return finishedAtB - finishedAtA;
            }

            return a.player.name.localeCompare(b.player.name);
        })
        .map((entry) => ({
            player_id: entry.player.id,
            player_name: entry.player.name,
            total_score: entry.total,
            finished_at: entry.player.finished_at,
            breakdown: entry.breakdown,
        }))
        .map((player, index, leaderboard) => ({
            ...player,
            rank: getFinalRank(leaderboard, index),
        }));

    const winners = finalLeaderboard.filter((player) => player.rank === 1);
    const winner = winners[0];

    awardsToInsert.push({
        room_id: roomId,
        category: 'final_winner',
        winner_player_id: winner.player_id,
        winner_player_name: winners
            .map((player) => player.player_name)
            .join(' / '),
        winner_score: winner.total_score,
        leaderboard_json: finalLeaderboard,
        is_final_winner: true,
    });

    await supabase
        .from('room_awards')
        .upsert(awardsToInsert, {
            onConflict: 'room_id,category',
        });
}
