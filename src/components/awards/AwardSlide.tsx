type LeaderboardPlayer = {
  player_name: string;
  score: number;
};

type Props = {
  emoji: string;
  title: string;
  winner: string;
  winnerScore: number;
  leaderboard: LeaderboardPlayer[];
  winnerLabel: string;
  leaderboardLabel: string;
};

export function AwardSlide({ emoji, title, winner, winnerScore, leaderboard, winnerLabel, leaderboardLabel }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 text-6xl">{emoji}</div>

      <h2 className="text-3xl font-bold text-[#222222]">{title}</h2>

      <div className="mt-8">
        <p className="text-sm tracking-wide text-gray-400 uppercase">{winnerLabel}</p>

        <h1 className="mt-2 text-5xl font-bold text-[#FF7F5C]">🥇 {winner}</h1>

        <p className="mt-2 text-lg text-gray-500">{winnerScore}</p>
      </div>

      <div className="mt-10 w-full max-w-sm rounded-[32px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-4 text-lg font-semibold text-[#222222]">{leaderboardLabel}</h3>

        <div className="flex flex-col gap-3">
          {leaderboard.map((player, index) => (
            <div key={player.player_name} className="flex items-center justify-between rounded-2xl bg-[#FAF7F2] p-4">
              <span className="font-medium text-[#222222]">
                {index + 1}. {player.player_name}
              </span>

              <span className="font-bold text-[#FF7F5C]">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
