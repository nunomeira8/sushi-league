import type { CSSProperties } from 'react';

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

const finaleConfetti = [
  { left: '4%', color: '#FFD166', x: '44px', delay: '0s' },
  { left: '12%', color: '#FF7F5C', x: '-30px', delay: '0.18s' },
  { left: '21%', color: '#FFFFFF', x: '24px', delay: '0.36s' },
  { left: '31%', color: '#6BA368', x: '-22px', delay: '0.54s' },
  { left: '43%', color: '#FFD166', x: '34px', delay: '0.1s' },
  { left: '55%', color: '#FF7F5C', x: '-38px', delay: '0.28s' },
  { left: '67%', color: '#FFFFFF', x: '20px', delay: '0.46s' },
  { left: '78%', color: '#7EC8E3', x: '-26px', delay: '0.64s' },
  { left: '91%', color: '#FFD166', x: '30px', delay: '0.22s' },
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

export function FinalWinnerSlide({ winner, leaderboard, title, finalRankingLabel, pointsLabel }: Props) {
  return (
    <div className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[30px] bg-[#3A322E] px-4 py-8 text-center shadow-[0_24px_70px_rgba(58,50,46,0.22)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        {finaleConfetti.map((piece, index) => (
          <span
            key={index}
            className="award-confetti-piece absolute top-0 h-4 w-2 rounded-sm"
            style={
              {
                left: piece.left,
                '--x': piece.x,
                '--delay': piece.delay,
                backgroundColor: piece.color,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-[#FFD166] to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-x-10 bottom-6 h-px bg-gradient-to-r from-transparent via-[#FF7F5C] to-transparent opacity-60" />

      <div className="champion-trophy relative text-8xl">🏆</div>

      <p className="mt-5 text-xs font-semibold text-[#FFD166] uppercase">{title}</p>

      <div className="champion-crown mt-5 text-5xl">👑</div>

      <div className="champion-shine relative mt-2 max-w-full overflow-hidden rounded-2xl px-3 py-1">
        <h1 className="text-5xl font-black text-[#FFD166] drop-shadow-[0_10px_26px_rgba(255,209,102,0.28)] sm:text-6xl">
          {winner.player_name}
        </h1>
      </div>

      <p className="mt-4 rounded-full border border-[#FFD166]/40 bg-[#FFF1D6] px-5 py-2 text-2xl font-black text-[#7A4D00] shadow-[0_10px_30px_rgba(255,209,102,0.2)]">
        {winner.total_score} {pointsLabel}
      </p>

      <div className="mt-10 w-full max-w-sm rounded-[28px] border border-[#FFD166]/25 bg-white p-5 shadow-[0_18px_54px_rgba(0,0,0,0.24)]">
        <h3 className="mb-4 text-lg font-bold text-[#222222]">{finalRankingLabel}</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => {
            const rank = player.rank ?? index + 1;
            const medal = getMedal(rank);
            const isChampion = rank === 1;

            return (
              <div
                key={player.player_id ?? player.player_name}
                className={`award-row flex items-center justify-between rounded-2xl p-4 ${
                  isChampion
                    ? 'border border-[#FFD166]/60 bg-[#FFF1D6] shadow-[0_8px_24px_rgba(255,209,102,0.2)]'
                    : 'bg-[#FAF7F2]'
                }`}
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
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
