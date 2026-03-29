import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useData } from '../../context/DataContext';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../data/categories';
import type { Category } from '../../types';

export default function CategoryBreakdown() {
  const { profiles } = useData();

  const data = useMemo(() => {
    const counts: Record<Category, number> = { journalist: 0, influencer: 0, media: 0, politician: 0 };
    profiles.forEach((p) => counts[p.category]++);
    return (Object.entries(counts) as [Category, number][])
      .filter(([, v]) => v > 0)
      .map(([cat, count]) => ({
        name: CATEGORY_LABELS[cat],
        value: count,
        color: CATEGORY_COLORS[cat],
      }));
  }, [profiles]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Podział wg kategorii</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
            formatter={(value) => [`${value} profili`, 'Liczba']}
          />
          <Legend
            formatter={(value: string) => <span className="text-xs text-slate-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
