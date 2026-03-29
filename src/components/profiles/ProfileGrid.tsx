import { useState } from 'react';
import type { EnrichedProfile } from '../../types';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';

interface Props {
  profiles: EnrichedProfile[];
}

export default function ProfileGrid({ profiles }: Props) {
  const [expandedHandle, setExpandedHandle] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {profiles.map((p) => (
          <div key={p.handle}>
            <ProfileCard
              profile={p}
              isExpanded={expandedHandle === p.handle}
              onToggle={() =>
                setExpandedHandle(expandedHandle === p.handle ? null : p.handle)
              }
            />
          </div>
        ))}
      </div>
      {expandedHandle && (
        <ProfileDetail
          profile={profiles.find((p) => p.handle === expandedHandle)!}
        />
      )}
    </div>
  );
}
