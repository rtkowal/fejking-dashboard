import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../../context/DataContext';
import { TECHNIQUE_LABELS } from '../../data/translations';

export default function TechniqueChart() {
  const { profiles } = useData();

  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    profiles.forEach((p) => {
      p.techniques.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([key, count]) => ({
        name: TECHNIQUE_LABELS[key] || key,
        count,
        key,
      }))
      .sort((a, b) => b.count - a.count);
  }, [profiles]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Najczęstsze techniki manipulacji</h3>
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 28)}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={180} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            formatter={(value) => [`${value} profili`, 'Użycie']}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? '#f97316' : '#fb923c'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
