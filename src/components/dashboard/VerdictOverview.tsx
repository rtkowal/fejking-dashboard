import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../../context/DataContext';
import { VERDICT_LABELS, VERDICT_COLORS, VERDICT_ORDER } from '../../data/translations';
import type { VerdictType } from '../../types';

export default function VerdictOverview() {
  const { profiles } = useData();

  const data = useMemo(() => {
    const totals: Record<string, number> = {};
    VERDICT_ORDER.forEach((v) => (totals[v] = 0));
    profiles.forEach((p) => {
      Object.entries(p.verdicts_summary).forEach(([k, v]) => {
        totals[k] = (totals[k] || 0) + (v || 0);
      });
    });
    return VERDICT_ORDER.map((v: VerdictType) => ({
      name: VERDICT_LABELS[v],
      count: totals[v] || 0,
      color: VERDICT_COLORS[v],
    }));
  }, [profiles]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Werdykty — podsumowanie</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={100} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            formatter={(value) => [`${value}`, 'Liczba']}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
