import { useMemo } from 'react';
import { useData } from '../../context/DataContext';

interface StatCard {
  label: string;
  value: string;
  sub?: string;
}

export default function StatsCards() {
  const { profiles } = useData();

  const stats: StatCard[] = useMemo(() => {
    const totalProfiles = profiles.length;
    const totalFlagged = profiles.reduce((s, p) => s + p.flagged_posts, 0);
    const totalPosts = profiles.reduce((s, p) => s + p.total_posts, 0);
    const avgScore = profiles.length
      ? profiles.reduce((s, p) => s + p.score, 0) / profiles.length
      : 0;
    const totalViews = profiles.reduce((s, p) => s + p.total_views, 0);
    const totalCN = profiles.reduce((s, p) => s + p.community_notes_count, 0);

    return [
      { label: 'Analizowane profile', value: String(totalProfiles), sub: `${totalPosts} postów` },
      { label: 'Oflagowane posty', value: String(totalFlagged), sub: `${totalPosts > 0 ? ((totalFlagged / totalPosts) * 100).toFixed(0) : 0}% wszystkich` },
      { label: 'Średni score', value: avgScore.toFixed(1), sub: 'skala 0–100' },
      { label: 'Suma wyświetleń', value: totalViews >= 1_000_000 ? `${(totalViews / 1_000_000).toFixed(1)}M` : `${(totalViews / 1_000).toFixed(0)}K`, sub: 'oflagowanych postów' },
      { label: 'Community Notes', value: String(totalCN), sub: 'na platformie 𝕏' },
    ];
  }, [profiles]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-500 mb-1">{s.label}</p>
          <p className="text-2xl font-bold text-primary">{s.value}</p>
          {s.sub && <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}
