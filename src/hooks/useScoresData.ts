import { useState, useEffect } from 'react';
import type { ProfileData, EnrichedProfile } from '../types';
import { CATEGORY_MAP } from '../data/categories';

const BASE_URL = import.meta.env.VITE_DATA_BASE_URL || import.meta.env.BASE_URL || './';

function enrichProfile(p: ProfileData): EnrichedProfile {
  const handle = p.handle;
  const cleanHandle = handle.replace('@', '');
  return {
    ...p,
    category: CATEGORY_MAP[handle] || 'influencer',
    avatarUrl: `https://unavatar.io/x/${cleanHandle}`,
  };
}

export function useScoresData() {
  const [profiles, setProfiles] = useState<EnrichedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${BASE_URL}data/current_scores.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw: ProfileData[] = await res.json();
        setProfiles(raw.map(enrichProfile));

        // Try to extract date from archive index
        try {
          const indexRes = await fetch(`${BASE_URL}data/archive/index.json`);
          if (indexRes.ok) {
            const files: string[] = await indexRes.json();
            if (files.length > 0) {
              const latest = files[files.length - 1];
              const match = latest.match(/scores_(\d{4}-\d{2}-\d{2})/);
              if (match) setReportDate(match[1]);
            }
          }
        } catch {
          // date extraction is optional
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Błąd ładowania danych');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { profiles, loading, error, reportDate };
}
