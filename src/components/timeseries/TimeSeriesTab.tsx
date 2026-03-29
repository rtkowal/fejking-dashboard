import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ProfileSelector from './ProfileSelector';
import ScoreTrendChart from './ScoreTrendChart';
import CategoryTrendChart from './CategoryTrendChart';

export default function TimeSeriesTab() {
  const { profiles, archive, archiveLoading } = useData();
  const [selectedHandles, setSelectedHandles] = useState<string[]>([]);

  if (archiveLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        <span className="ml-3 text-sm text-slate-500">Ładowanie danych historycznych...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-primary mb-3">Porównaj profile</h3>
        <ProfileSelector
          profiles={profiles}
          selected={selectedHandles}
          onChange={setSelectedHandles}
        />
      </div>

      <ScoreTrendChart archive={archive} selectedHandles={selectedHandles} />
      <CategoryTrendChart archive={archive} />
    </div>
  );
}
