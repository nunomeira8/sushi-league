import { supabase } from '@/lib/supabase';

const CATEGORY_WEIGHTS: Record<string, number> = {
    starters: 1,
    sushi: 1,
    sashimi: 1,
    temaki: 3,
    hot_dishes: 3,
};

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
        const categoryScores = scores
            .filter((score) => score.category === category)
            .sort((a, b) => b.score - a.score);

        if (!categoryScores.length) continue;

        const leaderboard = categoryScores.map((score) => {
            const player = players.find((p) => p.id === score.player_id);

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
            };
        });

        const winner = leaderboard[0];

        awardsToInsert.push({
            room_id: roomId,
            category,
            winner_player_id: winner.player_id,
            winner_player_name: winner.player_name,
            winner_score: winner.score,
            leaderboard_json: leaderboard,
            is_final_winner: false,
        });
    }

    const finalLeaderboard = Object.values(finalScores)
        .sort((a, b) => b.total - a.total)
        .map((entry) => ({
            player_id: entry.player.id,
            player_name: entry.player.name,
            total_score: entry.total,
            breakdown: entry.breakdown,
        }));

    const winner = finalLeaderboard[0];

    awardsToInsert.push({
        room_id: roomId,
        category: 'final_winner',
        winner_player_id: winner.player_id,
        winner_player_name: winner.player_name,
        winner_score: winner.total_score,
        leaderboard_json: finalLeaderboard,
        is_final_winner: true,
    });

    await supabase.from('room_awards').insert(awardsToInsert);
}