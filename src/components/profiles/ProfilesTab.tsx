import { useData } from '../../context/DataContext';
import { useFilteredProfiles } from '../../hooks/useFilteredProfiles';
import SearchInput from '../common/SearchInput';
import CategoryFilter from '../common/CategoryFilter';
import ProfileGrid from './ProfileGrid';
import MethodologySection from './MethodologySection';

export default function ProfilesTab() {
  const { profiles } = useData();
  const { filtered, search, setSearch, categoryFilter, setCategoryFilter } =
    useFilteredProfiles(profiles);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full sm:w-64">
          <SearchInput value={search} onChange={setSearch} />
        </div>
        <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
      </div>

      <p className="text-xs text-slate-400">
        Wyświetlono {filtered.length} z {profiles.length} profili
        {search && ` — szukaj: "${search}"`}
      </p>

      <ProfileGrid profiles={filtered} />

      <MethodologySection />
    </div>
  );
}
