type LeaderboardPlayer = {
  player_id?: string;
  player_name: string;
  score: number;
  rank?: number | null;
};

type Props = {
  emoji: string;
  title: string;
  winner: string;
  winnerScore: number;
  hasWinner: boolean;
  leaderboard: LeaderboardPlayer[];
  winnerLabel: string;
  noWinnerLabel: string;
  leaderboardLabel: string;
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

export function AwardSlide({
  emoji,
  title,
  winner,
  winnerScore,
  hasWinner,
  leaderboard,
  winnerLabel,
  noWinnerLabel,
  leaderboardLabel,
}: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 text-6xl">{emoji}</div>

      <h2 className="text-3xl font-bold text-[#222222]">{title}</h2>

      <div className="mt-8">
        <p className="text-sm tracking-wide text-gray-400 uppercase">{winnerLabel}</p>

        <h1 className={`mt-2 font-bold text-[#FF7F5C] ${hasWinner ? 'text-5xl' : 'text-4xl'}`}>
          {hasWinner ? `🥇 ${winner}` : noWinnerLabel}
        </h1>

        {hasWinner && <p className="mt-2 text-lg text-gray-500">{winnerScore}</p>}
      </div>

      <div className="mt-10 w-full max-w-sm rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-4 text-lg font-semibold text-[#222222]">{leaderboardLabel}</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => {
            const rank = player.rank === null ? null : player.rank ?? index + 1;
            const medal = rank && hasWinner ? getMedal(rank) : null;

            return (
              <div
                key={player.player_id ?? player.player_name}
                className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4"
              >
                <span className="flex items-center gap-2 font-medium text-[#222222]">
                  {rank && (
                    <span className="min-w-9 text-left">
                      {medal ? `${medal} ` : ''}
                      {getOrdinal(rank)}
                    </span>
                  )}
                  <span>{player.player_name}</span>
                </span>

                <span className="font-bold text-[#FF7F5C]">{player.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
