import { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { useScoresData } from './hooks/useScoresData';
import { useArchiveData } from './hooks/useArchiveData';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TabNavigation from './components/layout/TabNavigation';
import DashboardTab from './components/dashboard/DashboardTab';
import TimeSeriesTab from './components/timeseries/TimeSeriesTab';
import ProfilesTab from './components/profiles/ProfilesTab';
import type { TabId } from './types';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const { profiles, loading, error, reportDate } = useScoresData();
  const { archive, loading: archiveLoading } = useArchiveData(activeTab === 'timeseries');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-3 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-slate-500 mt-3">Ładowanie danych FejKing...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-lg font-semibold text-red-600 mb-2">Błąd ładowania danych</p>
          <p className="text-sm text-slate-500">{error}</p>
          <p className="text-xs text-slate-400 mt-2">
            Upewnij się, że plik <code className="bg-slate-100 px-1 rounded">data/current_scores.json</code> jest dostępny.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DataProvider
      value={{ profiles, archive, archiveLoading, loading, error, reportDate }}
    >
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <TabNavigation active={activeTab} onChange={setActiveTab} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'timeseries' && <TimeSeriesTab />}
          {activeTab === 'profiles' && <ProfilesTab />}
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
}
