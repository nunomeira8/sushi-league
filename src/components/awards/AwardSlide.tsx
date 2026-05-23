import type { CSSProperties } from 'react';

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

const confettiPieces = [
  { left: '8%', color: '#FF7F5C', x: '28px', delay: '0s' },
  { left: '18%', color: '#FFD166', x: '-18px', delay: '0.24s' },
  { left: '31%', color: '#6BA368', x: '16px', delay: '0.48s' },
  { left: '45%', color: '#7EC8E3', x: '-24px', delay: '0.12s' },
  { left: '59%', color: '#FF7F5C', x: '20px', delay: '0.36s' },
  { left: '73%', color: '#FFD166', x: '-14px', delay: '0.6s' },
  { left: '86%', color: '#6BA368', x: '18px', delay: '0.18s' },
];

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
    <div className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden text-center">
      {hasWinner && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 overflow-hidden">
          {confettiPieces.map((piece, index) => (
            <span
              key={index}
              className="award-confetti-piece absolute top-0 h-3 w-1.5 rounded-full"
              style={{
                left: piece.left,
                '--x': piece.x,
                '--delay': piece.delay,
                backgroundColor: piece.color,
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      <div className="award-pop award-float mb-6 rounded-full bg-white px-6 py-5 text-6xl shadow-[0_14px_38px_rgba(255,127,92,0.18)]">
        {emoji}
      </div>

      <h2 className="award-pop text-3xl font-bold text-[#222222]">{title}</h2>

      <div className="mt-8">
        <p className="text-sm tracking-wide text-gray-400 uppercase">{winnerLabel}</p>

        <h1
          className={`mt-2 font-bold text-[#FF7F5C] ${
            hasWinner ? 'award-winner-glow text-5xl' : 'text-4xl leading-tight'
          }`}
        >
          {hasWinner ? `🥇 ${winner}` : noWinnerLabel}
        </h1>

        {hasWinner && (
          <p className="mx-auto mt-4 inline-flex rounded-full bg-[#FFF1D6] px-5 py-2 text-lg font-bold text-[#D47A1C] shadow-sm">
            {winnerScore}
          </p>
        )}
      </div>

      <div className="mt-10 w-full max-w-sm rounded-[28px] border border-white/80 bg-white/95 p-5 shadow-[0_16px_44px_rgba(0,0,0,0.09)] backdrop-blur">
        <h3 className="mb-4 text-lg font-semibold text-[#222222]">{leaderboardLabel}</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => {
            const rank = player.rank === null ? null : player.rank ?? index + 1;
            const medal = rank && hasWinner ? getMedal(rank) : null;

            return (
              <div
                key={player.player_id ?? player.player_name}
                className="award-row flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4"
                style={{ '--delay': `${index * 80}ms` } as CSSProperties}
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
