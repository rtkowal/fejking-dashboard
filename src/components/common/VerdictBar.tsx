import type { VerdictsSummary, VerdictType } from '../../types';
import { VERDICT_COLORS, VERDICT_LABELS, VERDICT_ORDER } from '../../data/translations';

interface Props {
  summary: VerdictsSummary;
  height?: number;
}

export default function VerdictBar({ summary, height = 8 }: Props) {
  const total = VERDICT_ORDER.reduce((sum, v) => sum + (summary[v] || 0), 0);
  if (total === 0) return <div className="bg-slate-100 rounded-full" style={{ height }} />;

  return (
    <div className="flex rounded-full overflow-hidden" style={{ height }}>
      {VERDICT_ORDER.map((verdict: VerdictType) => {
        const count = summary[verdict] || 0;
        if (count === 0) return null;
        const pct = (count / total) * 100;
        return (
          <div
            key={verdict}
            className="relative group"
            style={{ width: `${pct}%`, backgroundColor: VERDICT_COLORS[verdict] }}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
              <div className="bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {VERDICT_LABELS[verdict]}: {count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
