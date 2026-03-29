import type { Category } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../data/categories';

interface Props {
  category: Category;
}

export default function CategoryBadge({ category }: Props) {
  return (
    <span
      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full text-white"
      style={{ backgroundColor: CATEGORY_COLORS[category] }}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
