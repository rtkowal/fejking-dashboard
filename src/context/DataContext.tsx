import { createContext, useContext } from 'react';
import type { EnrichedProfile, WeekSnapshot } from '../types';

interface DataContextValue {
  profiles: EnrichedProfile[];
  archive: WeekSnapshot[];
  archiveLoading: boolean;
  loading: boolean;
  error: string | null;
  reportDate: string | null;
}

const DataContext = createContext<DataContextValue>({
  profiles: [],
  archive: [],
  archiveLoading: false,
  loading: true,
  error: null,
  reportDate: null,
});

export const DataProvider = DataContext.Provider;

export function useData() {
  return useContext(DataContext);
}
