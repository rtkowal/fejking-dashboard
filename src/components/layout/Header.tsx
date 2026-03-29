import { useData } from '../../context/DataContext';

export default function Header() {
  const { reportDate } = useData();

  return (
    <header className="bg-primary text-white px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            FejKing
          </h1>
          <p className="text-sm text-white/70">
            Tygodniowy ranking dezinformacji na 𝕏
          </p>
        </div>
        {reportDate && (
          <div className="text-right">
            <p className="text-xs text-white/50">Raport z tygodnia</p>
            <p className="text-sm font-medium">{reportDate}</p>
          </div>
        )}
      </div>
    </header>
  );
}
