import { SUB_SCORE_LABELS, SUB_SCORE_WEIGHTS, TECHNIQUE_LABELS, DISCLAIMER } from '../../data/translations';
import { CATEGORY_MAP, CATEGORY_LABELS, CATEGORY_COLORS } from '../../data/categories';

export default function MethodologySection() {
  // Count profiles per category
  const categoryCounts: Record<string, number> = {};
  Object.values(CATEGORY_MAP).forEach((cat) => {
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const totalProfiles = Object.keys(CATEGORY_MAP).length;

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-lg font-bold text-primary">Metodologia FejKing</h2>

      {/* Pipeline overview */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Jak działa pipeline</h3>
        <p className="text-sm text-slate-600 mb-4">
          FejKing to automatyczny system monitorujący posty na platformie 𝕏 (Twitter) pod kątem dezinformacji.
          Raz w tygodniu pipeline pobiera najnowsze posty śledzonych profili i przepuszcza je przez 8-etapowy proces:
        </p>
        <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
          <li><strong>Scraping</strong> — pobranie postów z ostatnich 7 dni (Apify / Tweet Scraper)</li>
          <li><strong>Analiza obrazów</strong> — ekstrakcja tekstu z grafik i screenshotów (GPT-4o Vision)</li>
          <li><strong>Triage</strong> — odfiltrowanie satyr, memów, czystych opinii i czystych RT-ów</li>
          <li><strong>Ekstrakcja twierdzeń</strong> — wyciągnięcie sprawdzalnych twierdzeń faktograficznych z każdego posta</li>
          <li><strong>Fact-checking</strong> — weryfikacja każdego twierdzenia przez model LLM (GPT-4.1-mini)</li>
          <li><strong>Scoring</strong> — algorytmiczne wyliczenie score'u 0–100 dla każdego profilu</li>
          <li><strong>Raport</strong> — wygenerowanie tygodniowego podsumowania</li>
          <li><strong>Dashboard push</strong> — aktualizacja tej strony</li>
        </ol>
      </div>

      {/* Fact-checking */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Weryfikacja faktów</h3>
        <p className="text-sm text-slate-600 mb-3">
          Twierdzenia faktograficzne wyciągnięte z postów są weryfikowane przez model GPT-4.1-mini (OpenAI).
          Model ocenia każde twierdzenie na skali 6 werdyktów:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {([
            { label: 'Prawda', color: '#22c55e', score: 0 },
            { label: 'Raczej prawda', color: '#86efac', score: 10 },
            { label: 'Niesprawdzalne', color: '#9ca3af', score: 20 },
            { label: 'Wprowadzające w błąd', color: '#f97316', score: 50 },
            { label: 'Raczej fałsz', color: '#b91c1c', score: 75 },
            { label: 'Fałsz', color: '#dc2626', score: 100 },
          ] as const).map((v) => (
            <div key={v.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: v.color }}
              />
              <span className="text-xs text-slate-700">{v.label} ({v.score} pkt)</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600 mb-2">
          Każdy werdykt ma przypisaną siłę dowodów (<em>confidence</em>), która mnożnikuje score:
          silne ×1.0, umiarkowane ×0.67, słabe ×0.33.
        </p>
        <div className="bg-amber-50 rounded border border-amber-200 p-3">
          <p className="text-xs text-amber-700">
            <strong>Ograniczenie:</strong> Fact-checking opiera się na wiedzy parametrycznej modelu LLM (dane treningowe),
            bez dostępu do bieżących źródeł internetowych. Oznacza to, że werdykty dotyczące najnowszych wydarzeń
            mogą być nieprawidłowe. Pracujemy nad integracją z web search API.
          </p>
        </div>
      </div>

      {/* Scoring weights */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Formuła scoringu</h3>
        <p className="text-sm text-slate-600 mb-4">
          Score FejKing (0–100) jest obliczany jako średnia ważona pięciu komponentów.
          Im wyższy score, tym więcej dezinformacji wykryto w postach danego profilu w danym tygodniu.
          Profile z mniej niż 3 przeanalizowanymi postami nie są klasyfikowane w rankingu.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-xs font-medium text-slate-500 py-2 pr-4">Komponent</th>
                <th className="text-xs font-medium text-slate-500 py-2 pr-4">Waga</th>
                <th className="text-xs font-medium text-slate-500 py-2">Opis</th>
              </tr>
            </thead>
            <tbody>
              {(Object.entries(SUB_SCORE_LABELS) as [string, string][]).map(([key, label]) => (
                <tr key={key} className="border-b border-slate-50">
                  <td className="text-sm font-medium text-slate-700 py-2 pr-4">{label}</td>
                  <td className="text-sm text-slate-600 py-2 pr-4 tabular-nums">
                    {(SUB_SCORE_WEIGHTS[key] * 100).toFixed(0)}%
                  </td>
                  <td className="text-sm text-slate-500 py-2">
                    {componentDescription(key)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Techniques definitions */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Techniki manipulacji</h3>
        <p className="text-sm text-slate-600 mb-3">
          Pipeline wykrywa 6 technik dezinformacyjnych (czysto manipulacyjne; techniki retoryczne jak apel do emocji
          czy whataboutism zostały usunięte z katalogu):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(TECHNIQUE_LABELS).map(([key, label]) => (
            <div key={key} className="flex gap-2 items-start">
              <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-2.5 py-0.5 shrink-0 mt-0.5">
                {label}
              </span>
              <span className="text-xs text-slate-500">{techniqueDescription(key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracked profiles */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Śledzone profile</h3>
        <p className="text-sm text-slate-600 mb-3">
          Aktualnie monitorujemy <strong>{totalProfiles}</strong> profili w 4 kategoriach:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['politician', 'journalist', 'influencer', 'media'] as const).map((cat) => (
            <div key={cat} className="text-center p-3 rounded-lg bg-slate-50">
              <div
                className="text-2xl font-bold"
                style={{ color: CATEGORY_COLORS[cat] }}
              >
                {categoryCounts[cat] || 0}
              </div>
              <div className="text-xs text-slate-500 mt-1">{CATEGORY_LABELS[cat]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data source & schedule */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Źródło danych i harmonogram</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>Platforma:</strong> 𝕏 (dawniej Twitter) — posty, odpowiedzi, cytaty i retweety z komentarzem.
          </p>
          <p>
            <strong>Scraper:</strong> Apify Tweet Scraper — do 40 postów na profil na cykl.
          </p>
          <p>
            <strong>Częstotliwość:</strong> Raz w tygodniu (poniedziałek). Ranking obejmuje posty z ostatnich 7 dni.
          </p>
          <p>
            <strong>Modele AI:</strong> GPT-4.1-mini (triage, ekstrakcja twierdzeń, fact-checking), GPT-4o (analiza obrazów).
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
        <h3 className="text-base font-semibold text-amber-800 mb-2">Zastrzeżenie prawne</h3>
        <p className="text-sm text-amber-700 leading-relaxed">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

function componentDescription(key: string): string {
  const desc: Record<string, string> = {
    falsehood: 'Odsetek i dotkliwość fałszywych twierdzeń (werdykt × confidence)',
    technique: 'Różnorodność (60%) i częstotliwość (40%) technik manipulacji',
    reach: 'Zasięg postów — krzywa log-liniowa od 10K do 5M wyświetleń',
    repeat: 'Odsetek postów z fałszywymi twierdzeniami (≥67% = max score)',
    community_notes: 'Odsetek postów oznaczonych przez Community Notes 𝕏 (≥20% = max)',
  };
  return desc[key] || '';
}

function techniqueDescription(key: string): string {
  const desc: Record<string, string> = {
    cherry_picking: 'Selektywne wybieranie danych potwierdzających tezę',
    false_dichotomy: 'Przedstawianie tylko dwóch opcji, gdy istnieją inne',
    confabulation: 'Zmyślone dane, statystyki lub cytaty podawane jako fakty',
    decontextualization: 'Prawdziwe informacje wyrwane z oryginalnego kontekstu',
    false_authority: 'Powoływanie się na nieistniejących lub nieadekwatnych ekspertów',
    straw_man: 'Zniekształcanie cudzego stanowiska, by łatwiej je obalić',
  };
  return desc[key] || '';
}
