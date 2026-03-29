import { useState, useRef, useEffect } from 'react';
import type { EnrichedProfile } from '../../types';

interface Props {
  profiles: EnrichedProfile[];
  selected: string[];
  onChange: (handles: string[]) => void;
  max?: number;
}

export default function ProfileSelector({ profiles, selected, onChange, max = 10 }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = profiles.filter((p) =>
    p.handle.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(handle: string) {
    if (selected.includes(handle)) {
      onChange(selected.filter((h) => h !== handle));
    } else if (selected.length < max) {
      onChange([...selected, handle]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white hover:bg-slate-50"
      >
        {selected.length === 0
          ? 'Wybierz profile do porównania...'
          : `${selected.length} profil(i) wybranych`}
      </button>
      {open && (
        <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj..."
              className="w-full text-sm px-2 py-1 border border-slate-200 rounded"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filtered.map((p) => (
              <label
                key={p.handle}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(p.handle)}
                  onChange={() => toggle(p.handle)}
                  className="rounded"
                />
                <span className="text-sm text-slate-700">{p.handle}</span>
                <span className="text-xs text-slate-400 ml-auto">{p.score.toFixed(1)}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5"
            >
              {h}
              <button
                onClick={() => onChange(selected.filter((s) => s !== h))}
                className="hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
