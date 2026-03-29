import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { WeekSnapshot } from '../../types';

const LINE_COLORS = ['#1e3a5f', '#f97316', '#8b5cf6', '#14b8a6', '#dc2626', '#3b82f6', '#f59e0b', '#22c55e', '#ec4899', '#6366f1'];

interface Props {
  archive: WeekSnapshot[];
  selectedHandles: string[];
}

export default function ScoreTrendChart({ archive, selectedHandles }: Props) {
  const data = useMemo(() => {
    return archive.map((snap) => {
      const point: Record<string, string | number | null> = { date: snap.date };
      selectedHandles.forEach((handle) => {
        const prof = snap.profiles.find((p) => p.handle === handle);
        point[handle] = prof ? prof.score : null;
      });
      return point;
    });
  }, [archive, selectedHandles]);

  if (selectedHandles.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-400">Wybierz profile powyżej, aby zobaczyć ich trend score'u</p>
      </div>
    );
  }

  if (archive.length < 2) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-400">Dane trendów pojawią się po kilku tygodniach rankingu</p>
        <p className="text-xs text-slate-300 mt-1">Aktualnie: {archive.length} tydzień(e) danych</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-primary mb-3">Trend score'u — wybrane profile</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
          />
          {selectedHandles.map((handle, i) => (
            <Line
              key={handle}
              type="monotone"
              dataKey={handle}
              stroke={LINE_COLORS[i % LINE_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
