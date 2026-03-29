import { useState, useEffect } from 'react';
import type { ProfileData, WeekSnapshot } from '../types';
import { CATEGORY_MAP } from '../data/categories';

const BASE_URL = import.meta.env.VITE_DATA_BASE_URL || '';

export function useArchiveData(enabled: boolean) {
  const [archive, setArchive] = useState<WeekSnapshot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/data/archive/index.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const files: string[] = await res.json();

        const snapshots = await Promise.all(
          files.map(async (filename) => {
            const r = await fetch(`${BASE_URL}/data/archive/${filename}`);
            if (!r.ok) throw new Error(`HTTP ${r.status} for ${filename}`);
            const profiles: ProfileData[] = await r.json();
            const dateMatch = filename.match(/scores_(\d{4}-\d{2}-\d{2})/);
            const date = dateMatch ? dateMatch[1] : filename;
            return {
              date,
              profiles: profiles.map((p) => ({
                ...p,
                category: CATEGORY_MAP[p.handle] || ('influencer' as const),
                avatarUrl: `https://unavatar.io/x/${p.handle.replace('@', '')}`,
              })),
            };
          })
        );

        snapshots.sort((a, b) => a.date.localeCompare(b.date));
        setArchive(snapshots);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Błąd ładowania archiwum');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [enabled]);

  return { archive, loading, error };
}
