import { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import ProfileAvatar from '../common/ProfileAvatar';
import ScoreBadge from '../common/ScoreBadge';
import CategoryBadge from '../common/CategoryBadge';
import { SUB_SCORE_LABELS } from '../../data/translations';
import type { EnrichedProfile } from '../../types';

type SortKey = 'rank' | 'score' | 'falsehood' | 'technique' | 'reach' | 'repeat' | 'community_notes' | 'total_views';

export default function RankingTable() {
  const { profiles } = useData();
  const [expanded, setExpanded] = useState<'top5' | 'top20' | 'all'>('top5');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    const arr = [...profiles];
    arr.sort((a, b) => {
      let va: number, vb: number;
      if (sortKey === 'rank') { va = a.rank; vb = b.rank; }
      else if (sortKey === 'score') { va = a.score; vb = b.score; }
      else if (sortKey === 'total_views') { va = a.total_views; vb = b.total_views; }
      else { va = a.sub_scores[sortKey]; vb = b.sub_scores[sortKey]; }
      return sortAsc ? va - vb : vb - va;
    });
    return arr;
  }, [profiles, sortKey, sortAsc]);

  const displayed = useMemo(() => {
    if (expanded === 'top5') return sorted.slice(0, 5);
    if (expanded === 'top20') return sorted.slice(0, 20);
    return sorted;
  }, [sorted, expanded]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === 'rank'); }
  }

  function SortHeader({ label, field, className = '' }: { label: string; field: SortKey; className?: string }) {
    return (
      <th
        className={`px-2 py-2 text-xs font-medium text-slate-500 cursor-pointer hover:text-slate-700 select-none ${className}`}
        onClick={() => handleSort(field)}
      >
        {label}
        {sortKey === field && (
          <span className="ml-0.5">{sortAsc ? '↑' : '↓'}</span>
        )}
      </th>
    );
  }

  function SubScoreBar({ value }: { value: number }) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${value}%`,
              backgroundColor: value >= 60 ? '#dc2626' : value >= 40 ? '#f97316' : value >= 20 ? '#eab308' : '#22c55e',
            }}
          />
        </div>
        <span className="text-xs tabular-nums text-slate-500 w-6">{Math.round(value)}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h2 className="text-base font-semibold text-primary">Ranking FejKing</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <SortHeader label="#" field="rank" className="w-10 text-center" />
              <th className="px-2 py-2 text-xs font-medium text-slate-500">Profil</th>
              <SortHeader label="Score" field="score" />
              <th className="px-2 py-2 text-xs font-medium text-slate-500 hidden sm:table-cell">Kategoria</th>
              {Object.entries(SUB_SCORE_LABELS).map(([key, label]) => (
                <SortHeader key={key} label={label} field={key as SortKey} className="hidden lg:table-cell" />
              ))}
              <SortHeader label="Wyświetlenia" field="total_views" className="hidden md:table-cell" />
            </tr>
          </thead>
          <tbody>
            {displayed.map((p: EnrichedProfile) => (
              <tr
                key={p.handle}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-2 py-2.5 text-center text-sm font-medium text-slate-400">
                  {p.rank}
                </td>
                <td className="px-2 py-2.5">
                  <a
                    href={`https://x.com/${p.handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <ProfileAvatar url={p.avatarUrl} handle={p.handle} size={28} />
                    <span className="text-sm font-medium text-slate-800">{p.handle}</span>
                  </a>
                </td>
                <td className="px-2 py-2.5">
                  <ScoreBadge score={p.score} size="sm" />
                </td>
                <td className="px-2 py-2.5 hidden sm:table-cell">
                  <CategoryBadge category={p.category} />
                </td>
                {(['falsehood', 'technique', 'reach', 'repeat', 'community_notes'] as const).map((key) => (
                  <td key={key} className="px-2 py-2.5 hidden lg:table-cell">
                    <SubScoreBar value={p.sub_scores[key]} />
                  </td>
                ))}
                <td className="px-2 py-2.5 hidden md:table-cell text-xs text-slate-500 tabular-nums">
                  {p.total_views >= 1_000_000
                    ? `${(p.total_views / 1_000_000).toFixed(1)}M`
                    : `${(p.total_views / 1_000).toFixed(0)}K`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 flex gap-3 border-t border-slate-100">
        {expanded !== 'top5' && (
          <button
            onClick={() => setExpanded('top5')}
            className="text-xs text-accent hover:text-accent-dark font-medium"
          >
            Pokaż TOP 5
          </button>
        )}
        {expanded === 'top5' && (
          <button
            onClick={() => setExpanded('top20')}
            className="text-xs text-accent hover:text-accent-dark font-medium"
          >
            Pokaż pozycje 6–20
          </button>
        )}
        {expanded !== 'all' && (
          <button
            onClick={() => setExpanded('all')}
            className="text-xs text-accent hover:text-accent-dark font-medium"
          >
            Pokaż wszystkie ({profiles.length})
          </button>
        )}
      </div>
    </div>
  );
}
