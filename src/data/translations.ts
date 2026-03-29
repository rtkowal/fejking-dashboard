import type { VerdictType } from '../types';

export const TECHNIQUE_LABELS: Record<string, string> = {
  cherry_picking: 'Wybieranie danych pod tezę',
  false_dichotomy: 'Fałszywa dychotomia',
  appeal_to_emotion: 'Apel do emocji',
  confabulation: 'Konfabulacja (zmyślone fakty)',
  decontextualization: 'Wyrwanie z kontekstu',
  gish_gallop: 'Zasypywanie argumentami',
  ad_hominem: 'Atak na osobę',
  false_authority: 'Fałszywy autorytet',
  whataboutism: '„A co z…" (odwracanie uwagi)',
  straw_man: 'Chochoł (zniekształcanie argumentu)',
};

export const VERDICT_LABELS: Record<VerdictType, string> = {
  TRUE: 'Prawda',
  MOSTLY_TRUE: 'Raczej prawda',
  UNVERIFIABLE: 'Niesprawdzalne',
  MISLEADING: 'Wprowadzające w błąd',
  MOSTLY_FALSE: 'Raczej fałsz',
  FALSE: 'Fałsz',
};

export const VERDICT_COLORS: Record<VerdictType, string> = {
  TRUE: '#22c55e',
  MOSTLY_TRUE: '#86efac',
  UNVERIFIABLE: '#9ca3af',
  MISLEADING: '#f97316',
  MOSTLY_FALSE: '#b91c1c',
  FALSE: '#dc2626',
};

export const VERDICT_ORDER: VerdictType[] = [
  'FALSE',
  'MOSTLY_FALSE',
  'MISLEADING',
  'UNVERIFIABLE',
  'MOSTLY_TRUE',
  'TRUE',
];

export const SUB_SCORE_LABELS: Record<string, string> = {
  falsehood: 'Fałszywość twierdzeń',
  technique: 'Techniki manipulacji',
  reach: 'Zasięg',
  repeat: 'Powtarzalność',
  community_notes: 'Community Notes',
};

export const SUB_SCORE_WEIGHTS: Record<string, number> = {
  falsehood: 0.30,
  technique: 0.20,
  reach: 0.15,
  repeat: 0.15,
  community_notes: 0.20,
};

export const DISCLAIMER = 'FejKing ocenia TREŚĆ postów, nie osoby. Każde twierdzenie jest weryfikowane wobec publicznie dostępnych źródeł. Ranking nie przypisuje intencji ani nie nazywa nikogo kłamcą. Niska pozycja w rankingu nie oznacza wiarygodności — oznacza jedynie mniej oflagowanych twierdzeń w danym tygodniu.';
