interface Props {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

function scoreColor(score: number): string {
  if (score >= 60) return 'bg-red-600 text-white';
  if (score >= 40) return 'bg-orange-500 text-white';
  if (score >= 20) return 'bg-yellow-400 text-slate-900';
  return 'bg-green-500 text-white';
}

const sizes = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-0.5',
  lg: 'text-base px-3 py-1',
};

export default function ScoreBadge({ score, size = 'md' }: Props) {
  return (
    <span
      className={`inline-block rounded font-semibold tabular-nums ${scoreColor(score)} ${sizes[size]}`}
    >
      {score.toFixed(1)}
    </span>
  );
}
