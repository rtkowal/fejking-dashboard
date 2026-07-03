import { SUB_SCORE_LABELS, SUB_SCORE_WEIGHTS } from '../../data/translations';
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

      {/* Jak działa FejKing */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Jak działa FejKing</h3>
        <p className="text-sm text-slate-600">
          FejKing to automatyczny system monitorujący posty na platformie 𝕏 (Twitter) pod kątem
          dezinformacji. Raz w tygodniu pipeline pobiera najnowsze posty śledzonych profili
          i przepuszcza je przez wielo-etapowy proces polegający na scrapingu, analizie obrazów,
          triage (odfiltrowanie satyr, memów, czystych opinii i czystych RT-ów), ekstrakcji
          sprawdzalnych twierdzeń faktograficznych z każdego posta, fact-checking, scoring.
        </p>
      </div>

      {/* Weryfikacja faktów */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Weryfikacja faktów</h3>
        <p className="text-sm text-slate-600 mb-3">
          Twierdzenia faktograficzne wyciągnięte z postów są weryfikowane przez modele oceniające
          każde twierdzenie na skali 6 werdyktów od Prawdy (0 pkt) do Fałszu (100 pkt), gdzie każdy
          werdykt ma przypisaną siłę dowodów, która mnożnikuje wynik: silne ×1.0, umiarkowane ×0.67,
          słabe ×0.33.
        </p>
        <p className="text-sm text-slate-600">
          <strong>Ograniczenie:</strong> Fact-checking opiera się na wiedzy parametrycznej (dane
          treningowe), oraz web search API.
        </p>
      </div>

      {/* Formuła scoringu */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Formuła scoringu</h3>
        <p className="text-sm text-slate-600 mb-4">
          Wynik FejKing (0–100) jest obliczany jako średnia ważona pięciu komponentów. Im wyższy
          wynik (score), tym więcej dezinformacji wykryto w postach danego profilu w danym tygodniu.
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

      {/* Techniki manipulacji */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Techniki manipulacji</h3>
        <p className="text-sm text-slate-600 mb-3">
          Pipeline wykrywa 6 technik dezinformacyjnych (czysto manipulacyjne; techniki retoryczne
          jak apel do emocji czy whataboutism zostały usunięte z katalogu):
        </p>
        <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
          <li>Selektywne wybieranie danych pod tezę</li>
          <li>Fałszywa dychotomia</li>
          <li>Konfabulacja (zmyślone fakty/dane)</li>
          <li>Wyrwanie z kontekstu</li>
          <li>Fałszywy autorytet</li>
          <li>Chochoł (zniekształcanie argumentu)</li>
        </ol>
      </div>

      {/* Śledzone profile */}
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
