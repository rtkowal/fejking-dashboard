import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useData } from '../../context/DataContext';

const BUCKETS = ['0–10', '11–20', '21–30', '31–40', '41–50', '51–60', '61–70', '71–80', '81–90', '91–100'];
const COLORS = ['#22c55e', '#4ade80', '#86efac', '#fde047', '#facc15', '#f97316', '#ea580c', '#dc2626', '#b91c1c', '#991b1b'];

export default function ScoreDistribution() {
  const { profiles } = useData();

  const data = useMemo(() => {
    const counts = new Array(10).fill(0);
    profiles.forEach((p) => {
      const idx = Math.min(Math.floor(p.score / 10), 9);
      counts[idx]++;
    });
    return BUCKETS.map((name, i) => ({ name, count: counts[i], color: COLORS[i] }));
  }, [profiles]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Rozkład score'ów</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            formatter={(value) => [`${value} profili`, 'Liczba']}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
