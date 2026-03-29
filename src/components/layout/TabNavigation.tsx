import type { TabId } from '../../types';

const TABS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'timeseries', label: 'Trendy' },
  { id: 'profiles', label: 'Profile i Metodologia' },
];

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export default function TabNavigation({ active, onChange }: Props) {
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              active === tab.id
                ? 'border-accent text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
