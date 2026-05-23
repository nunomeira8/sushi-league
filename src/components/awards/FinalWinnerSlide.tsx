type LeaderboardPlayer = {
  player_id?: string;
  player_name: string;
  total_score: number;
  breakdown: Record<string, number>;
  rank?: number;
};

type Props = {
  winner: LeaderboardPlayer;
  leaderboard: LeaderboardPlayer[];
  title: string;
  finalRankingLabel: string;
  pointsLabel: string;
};

function getOrdinal(rank: number) {
  const remainder = rank % 100;

  if (remainder >= 11 && remainder <= 13) {
    return `${rank}th`;
  }

  switch (rank % 10) {
    case 1:
      return `${rank}st`;
    case 2:
      return `${rank}nd`;
    case 3:
      return `${rank}rd`;
    default:
      return `${rank}th`;
  }
}

function getMedal(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';

  return null;
}

export function FinalWinnerSlide({ winner, leaderboard, title, finalRankingLabel, pointsLabel }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="text-7xl">🏆</div>

      <p className="mt-4 text-sm tracking-[0.3em] text-gray-400 uppercase">{title}</p>

      <h1 className="mt-6 text-5xl font-bold text-[#FF7F5C] sm:text-6xl">{winner.player_name}</h1>

      <p className="mt-3 text-2xl font-semibold text-[#222222]">
        {winner.total_score} {pointsLabel}
      </p>

      <div className="mt-10 w-full max-w-sm rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-4 text-lg font-semibold text-[#222222]">{finalRankingLabel}</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => {
            const rank = player.rank ?? index + 1;
            const medal = getMedal(rank);

            return (
              <div
                key={player.player_id ?? player.player_name}
                className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4"
              >
                <span className="flex items-center gap-2 font-medium text-[#222222]">
                  <span className="min-w-9 text-left">
                    {medal ? `${medal} ` : ''}
                    {getOrdinal(rank)}
                  </span>
                  <span>{player.player_name}</span>
                </span>

                <span className="font-bold text-[#FF7F5C]">{player.total_score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
