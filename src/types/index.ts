export interface Verdict {
  claim: string;
  verdict: VerdictType;
  evidence_summary: string;
}

export interface TopFakePost {
  text: string;
  url: string;
  views: number;
  verdicts: Verdict[];
}

export interface SubScores {
  falsehood: number;
  technique: number;
  reach: number;
  repeat: number;
  community_notes: number;
}

export type VerdictType =
  | 'TRUE'
  | 'MOSTLY_TRUE'
  | 'UNVERIFIABLE'
  | 'MISLEADING'
  | 'MOSTLY_FALSE'
  | 'FALSE';

export type VerdictsSummary = Partial<Record<VerdictType, number>>;

export interface ProfileData {
  handle: string;
  rank: number;
  score: number;
  sub_scores: SubScores;
  total_posts: number;
  flagged_posts: number;
  total_views: number;
  total_rts: number;
  community_notes_count: number;
  top_fake: TopFakePost;
  techniques: string[];
  verdicts_summary: VerdictsSummary;
}

export type Category = 'journalist' | 'influencer' | 'media' | 'politician';

export interface EnrichedProfile extends ProfileData {
  category: Category;
  avatarUrl: string;
}

export interface WeekSnapshot {
  date: string;
  profiles: EnrichedProfile[];
}

export type TabId = 'dashboard' | 'timeseries' | 'profiles';
