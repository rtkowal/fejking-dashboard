import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import type { WeekSnapshot, Category } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../data/categories';

interface Props {
  archive: WeekSnapshot[];
}

const CATEGORIES: Category[] = ['politician', 'journalist', 'influencer', 'media'];

export default function CategoryTrendChart({ archive }: Props) {
  const data = useMemo(() => {
    return archive.map((snap) => {
      const point: Record<string, string | number> = { date: snap.date };
      CATEGORIES.forEach((cat) => {
        const catProfiles = snap.profiles.filter((p) => p.category === cat);
        const avg = catProfiles.length
          ? catProfiles.reduce((s, p) => s + p.score, 0) / catProfiles.length
          : 0;
        point[cat] = Number(avg.toFixed(1));
      });
      return point;
    });
  }, [archive]);

  if (archive.length < 2) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-400">Średnie kategorii pojawią się po kilku tygodniach rankingu</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Średni score wg kategorii</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          <Legend
            formatter={(value: string) => (
              <span className="text-xs">{CATEGORY_LABELS[value as Category] || value}</span>
            )}
          />
          {CATEGORIES.map((cat) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              name={cat}
              stroke={CATEGORY_COLORS[cat]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
