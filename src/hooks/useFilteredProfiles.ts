import { useMemo, useState } from 'react';
import type { EnrichedProfile, Category } from '../types';

export function useFilteredProfiles(profiles: EnrichedProfile[]) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const filtered = useMemo(() => {
    let result = profiles;
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.handle.toLowerCase().includes(q));
    }
    return result;
  }, [profiles, search, categoryFilter]);

  return { filtered, search, setSearch, categoryFilter, setCategoryFilter };
}
