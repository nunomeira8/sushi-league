'use client';

type LeaderboardPlayer = {
  player_name: string;
  total_score: number;
  breakdown: Record<string, number>;
};

type Props = {
  winner: LeaderboardPlayer;
  leaderboard: LeaderboardPlayer[];
};

export function FinalWinnerSlide({ winner, leaderboard }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="text-7xl">🏆</div>

      <p className="mt-4 text-sm tracking-[0.3em] text-gray-400 uppercase">LAST MAN STANDING</p>

      <h1 className="mt-6 text-6xl font-bold text-[#FF7F5C]">{winner.player_name}</h1>

      <p className="mt-3 text-2xl font-semibold text-[#222222]">{winner.total_score} pts</p>

      <div className="mt-10 w-full max-w-sm rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-4 text-lg font-semibold text-[#222222]">Final Ranking</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => (
            <div key={player.player_name} className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
              <span className="font-medium text-[#222222]">
                {index + 1}. {player.player_name}
              </span>

              <span className="font-bold text-[#FF7F5C]">{player.total_score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
