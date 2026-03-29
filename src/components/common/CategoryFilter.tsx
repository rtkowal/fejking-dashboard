import type { Category } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../data/categories';

interface Props {
  value: Category | 'all';
  onChange: (value: Category | 'all') => void;
}

const categories: (Category | 'all')[] = ['all', 'politician', 'journalist', 'influencer', 'media'];

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = value === cat;
        const label = cat === 'all' ? 'Wszystkie' : CATEGORY_LABELS[cat];
        const color = cat === 'all' ? '#64748b' : CATEGORY_COLORS[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              isActive
                ? 'text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
            style={
              isActive
                ? { backgroundColor: color, borderColor: color }
                : { borderColor: '#e2e8f0' }
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
