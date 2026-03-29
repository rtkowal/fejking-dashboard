import type { EnrichedProfile } from '../../types';
import ProfileAvatar from '../common/ProfileAvatar';
import ScoreBadge from '../common/ScoreBadge';
import CategoryBadge from '../common/CategoryBadge';
import VerdictBar from '../common/VerdictBar';

interface Props {
  profile: EnrichedProfile;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ProfileCard({ profile, isExpanded, onToggle }: Props) {
  const p = profile;
  return (
    <div
      className={`bg-white rounded-lg border transition-shadow cursor-pointer ${
        isExpanded ? 'border-accent shadow-md' : 'border-slate-200 hover:shadow-sm'
      }`}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <ProfileAvatar url={p.avatarUrl} handle={p.handle} size={44} />
          <div className="min-w-0 flex-1">
            <a
              href={`https://x.com/${p.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-800 hover:underline block truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {p.handle}
            </a>
            <div className="flex items-center gap-2 mt-1">
              <CategoryBadge category={p.category} />
              <span className="text-xs text-slate-400">#{p.rank}</span>
            </div>
          </div>
          <ScoreBadge score={p.score} size="lg" />
        </div>
        <VerdictBar summary={p.verdicts_summary} height={6} />
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>{p.flagged_posts}/{p.total_posts} oflagowanych</span>
          <span>{p.total_views >= 1000 ? `${(p.total_views / 1000).toFixed(0)}K` : p.total_views} wyświetleń</span>
        </div>
      </div>
    </div>
  );
}
