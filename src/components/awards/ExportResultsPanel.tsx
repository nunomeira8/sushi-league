'use client';

import { Clipboard, FileText, Share2, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type CategoryAward = {
  category: string;
  winner_player_name: string;
  winner_score: number;
  is_final_winner: false;
  leaderboard_json: {
    player_name: string;
    score: number;
    rank?: number | null;
  }[];
};

type FinalAward = {
  category: 'final_winner';
  winner_player_name: string;
  winner_score: number;
  is_final_winner: true;
  leaderboard_json: {
    player_name: string;
    total_score: number;
    rank?: number;
  }[];
};

type Award = CategoryAward | FinalAward;

type Props = {
  awards: Award[];
  categoryLabels: Record<string, string>;
  labels: {
    appName: string;
    exportResults: string;
    exportResultsTitle: string;
    playedOn: string;
    categoriesInPlay: string;
    playedBy: string;
    finalWinner: string;
    categoryWinners: string;
    leaderboard: string;
    winner: string;
    noWinner: string;
    points: string;
    copy: string;
    share: string;
    pdf: string;
    copied: string;
    shareUnavailable: string;
  };
};

function getOrdinal(rank: number) {
  const remainder = rank % 100;

  if (remainder >= 11 && remainder <= 13) return `${rank}th`;

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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function ExportResultsPanel({ awards, categoryLabels, labels }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');

  const finalAward = awards.find((award): award is FinalAward => award.is_final_winner);
  const categoryAwards = awards.filter((award): award is CategoryAward => !award.is_final_winner);
  const categoriesInPlay = categoryAwards.map((award) => categoryLabels[award.category] || award.category);
  const playedOn = new Date().toLocaleDateString();
  const players = Array.from(
    new Set(
      (finalAward?.leaderboard_json || categoryAwards.flatMap((award) => award.leaderboard_json))
        .map((player) => player.player_name)
        .filter(Boolean),
    ),
  );
  const playedBy = players.length ? `${players.join(' , ')}.` : '';

  const exportText = useMemo(() => {
    const lines = [
      labels.appName,
      `${labels.playedOn}: ${playedOn}`,
      `${labels.categoriesInPlay}: ${categoriesInPlay.join(' , ')}`,
      `${labels.playedBy}: ${playedBy}`,
      '',
      labels.exportResultsTitle,
      '',
    ];

    if (finalAward) {
      lines.push(`**${labels.finalWinner}:** ${finalAward.winner_player_name} (${finalAward.winner_score} ${labels.points})`);
      lines.push(`**${labels.leaderboard}**`);

      finalAward.leaderboard_json.forEach((player, index) => {
        const rank = player.rank ?? index + 1;
        lines.push(`${getOrdinal(rank)} - ${player.player_name}: ${player.total_score} ${labels.points}`);
      });

      lines.push('');
    }

    lines.push(`**${labels.categoryWinners}**`);

    categoryAwards.forEach((award) => {
      const categoryName = categoryLabels[award.category] || award.category;
      const winner = award.winner_score > 0
        ? `${award.winner_player_name} (${award.winner_score})`
        : labels.noWinner.replace('{category}', categoryName);

      lines.push('');
      lines.push(`**${categoryName}:** ${winner}`);
      lines.push(`**${labels.leaderboard}**`);

      award.leaderboard_json.forEach((player, index) => {
        const rank = player.rank ?? index + 1;
        const ranking = player.rank === null ? '-' : getOrdinal(rank);
        lines.push(`${ranking} - ${player.player_name}: ${player.score}`);
      });
    });

    return lines.join('\n');
  }, [categoriesInPlay, categoryAwards, categoryLabels, finalAward, labels, playedBy, playedOn]);

  async function copyResults() {
    await navigator.clipboard.writeText(exportText);
    setStatus(labels.copied);
  }

  async function shareResults() {
    if (!navigator.share) {
      await copyResults();
      setStatus(labels.shareUnavailable);
      return;
    }

    await navigator.share({
      title: labels.exportResultsTitle,
      text: exportText,
    });
  }

  function openPdf() {
    const finalLeaderboard = finalAward?.leaderboard_json
      .map((player, index) => {
        const rank = player.rank ?? index + 1;

        return `
          <li>
            <strong>${escapeHtml(getOrdinal(rank))}</strong>
            <span>${escapeHtml(player.player_name)}</span>
            <b>${player.total_score} ${escapeHtml(labels.points)}</b>
          </li>
        `;
      })
      .join('');
    const categorySections = categoryAwards
      .map((award) => {
        const categoryName = categoryLabels[award.category] || award.category;
        const winner = award.winner_score > 0
          ? `${award.winner_player_name} (${award.winner_score})`
          : labels.noWinner.replace('{category}', categoryName);
        const leaderboard = award.leaderboard_json
          .map((player, index) => {
            const rank = player.rank ?? index + 1;
            const ranking = player.rank === null ? '-' : getOrdinal(rank);

            return `
              <li>
                <strong>${escapeHtml(ranking)}</strong>
                <span>${escapeHtml(player.player_name)}</span>
                <b>${player.score}</b>
              </li>
            `;
          })
          .join('');

        return `
          <section class="category">
            <h3>${escapeHtml(categoryName)}</h3>
            <p class="winner"><strong>${escapeHtml(labels.winner)}:</strong> ${escapeHtml(winner)}</p>
            <h4>${escapeHtml(labels.leaderboard)}</h4>
            <ol>${leaderboard}</ol>
          </section>
        `;
      })
      .join('');
    const printWindow = window.open('', '_blank');

    if (!printWindow) return;

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${escapeHtml(labels.exportResultsTitle)}</title>
          <style>
            body { background: #faf7f2; color: #222; font-family: Arial, sans-serif; margin: 0; }
            main { background: white; margin: 28px auto; max-width: 760px; padding: 36px; }
            h1 { color: #ff7f5c; font-size: 34px; margin: 0 0 12px; }
            h2 { color: #222; font-size: 24px; margin: 28px 0 14px; }
            h3 { color: #ff7f5c; font-size: 22px; margin: 0 0 8px; }
            h4 { color: #555; font-size: 13px; letter-spacing: 0.08em; margin: 14px 0 8px; text-transform: uppercase; }
            p { font-size: 14px; line-height: 1.45; margin: 0 0 8px; }
            .meta { background: #faf7f2; border-radius: 18px; margin-top: 18px; padding: 16px; }
            .meta p strong { color: #222; }
            .winner-card { background: #fff1d6; border-radius: 22px; margin: 22px 0; padding: 18px; }
            .winner-card p { font-size: 20px; font-weight: 800; }
            .category { border-top: 2px solid #faf7f2; margin-top: 22px; padding-top: 22px; }
            .category .winner { font-size: 16px; }
            ol { display: grid; gap: 8px; list-style: none; margin: 0; padding: 0; }
            li { align-items: center; background: #faf7f2; border-radius: 14px; display: grid; gap: 10px; grid-template-columns: 60px 1fr auto; padding: 10px 12px; }
            li strong { color: #ff7f5c; }
            li b { color: #d47a1c; }
          </style>
        </head>
        <body>
          <main>
            <h1>${escapeHtml(labels.appName)}</h1>
            <div class="meta">
              <p><strong>${escapeHtml(labels.playedOn)}:</strong> ${escapeHtml(playedOn)}</p>
              <p><strong>${escapeHtml(labels.categoriesInPlay)}:</strong> ${escapeHtml(categoriesInPlay.join(' , '))}</p>
              <p><strong>${escapeHtml(labels.playedBy)}:</strong> ${escapeHtml(playedBy)}</p>
            </div>
            <h2>${escapeHtml(labels.exportResultsTitle)}</h2>
            ${
              finalAward
                ? `
                  <section class="winner-card">
                    <p>${escapeHtml(finalAward.winner_player_name)}</p>
                    <span>${finalAward.winner_score} ${escapeHtml(labels.points)}</span>
                  </section>
                  <h4>${escapeHtml(labels.leaderboard)}</h4>
                  <ol>${finalLeaderboard}</ol>
                `
                : ''
            }
            <h2>${escapeHtml(labels.categoryWinners)}</h2>
            ${categorySections}
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 rounded-2xl bg-[#FF7F5C] py-3 text-sm font-semibold text-white shadow-sm transition active:scale-95"
      >
        {labels.exportResults}
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 bg-black/60 px-4 py-6">
          <div className="flex min-h-full items-end justify-center sm:items-center">
            <div
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-[28px] bg-white p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-[#222222]">{labels.exportResultsTitle}</h2>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-[#FF7F5C]/20 bg-[#FFF1D6] p-2 text-[#FF7F5C] shadow-sm transition active:scale-95"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <button onClick={copyResults} className="rounded-2xl bg-[#FAF7F2] p-4 font-semibold text-[#222222]">
                  <Clipboard className="mx-auto mb-2 text-[#FF7F5C]" size={22} />
                  {labels.copy}
                </button>

                <button onClick={shareResults} className="rounded-2xl bg-[#FAF7F2] p-4 font-semibold text-[#222222]">
                  <Share2 className="mx-auto mb-2 text-[#FF7F5C]" size={22} />
                  {labels.share}
                </button>

                <button onClick={openPdf} className="rounded-2xl bg-[#FAF7F2] p-4 font-semibold text-[#222222]">
                  <FileText className="mx-auto mb-2 text-[#FF7F5C]" size={22} />
                  {labels.pdf}
                </button>
              </div>

              {status && <p className="mt-4 text-center text-sm font-medium text-[#6BA368]">{status}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
