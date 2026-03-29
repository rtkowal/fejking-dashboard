import type { EnrichedProfile } from '../../types';
import { SUB_SCORE_LABELS } from '../../data/translations';
import { TECHNIQUE_LABELS, VERDICT_LABELS, VERDICT_COLORS } from '../../data/translations';

interface Props {
  profile: EnrichedProfile;
}

export default function ProfileDetail({ profile: p }: Props) {
  return (
    <div className="bg-white rounded-lg border border-accent/30 p-4 space-y-4">
      {/* Sub-scores */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Składowe score'u</h4>
        <div className="space-y-2">
          {(Object.entries(SUB_SCORE_LABELS) as [string, string][]).map(([key, label]) => {
            const val = p.sub_scores[key as keyof typeof p.sub_scores];
            return (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-600 w-36 shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${val}%`,
                      backgroundColor: val >= 60 ? '#dc2626' : val >= 40 ? '#f97316' : val >= 20 ? '#eab308' : '#22c55e',
                    }}
                  />
                </div>
                <span className="text-xs tabular-nums text-slate-500 w-8 text-right">{val.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Techniques */}
      {p.techniques.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Techniki manipulacji</h4>
          <div className="flex flex-wrap gap-1.5">
            {p.techniques.map((t) => (
              <span key={t} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-2.5 py-0.5">
                {TECHNIQUE_LABELS[t] || t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top fake post */}
      {p.top_fake && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Najbardziej rażący post</h4>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <p className="text-sm text-slate-700 mb-2 line-clamp-3">{p.top_fake.text}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span>{p.top_fake.views >= 1000 ? `${(p.top_fake.views / 1000).toFixed(0)}K` : p.top_fake.views} wyświetleń</span>
              <a
                href={p.top_fake.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Zobacz na 𝕏 →
              </a>
            </div>
            {p.top_fake.verdicts.map((v, i) => (
              <div key={i} className="border-t border-slate-200 pt-2 mt-2">
                <div className="flex items-start gap-2">
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 text-white"
                    style={{ backgroundColor: VERDICT_COLORS[v.verdict] }}
                  >
                    {VERDICT_LABELS[v.verdict]}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-700">{v.claim}</p>
                    <p className="text-xs text-slate-500 mt-1">{v.evidence_summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
