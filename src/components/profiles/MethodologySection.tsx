import { SUB_SCORE_LABELS, SUB_SCORE_WEIGHTS, TECHNIQUE_LABELS, DISCLAIMER } from '../../data/translations';

export default function MethodologySection() {
  return (
    <div className="space-y-6">
      {/* Scoring weights */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-primary mb-3">Metodologia scoringu</h3>
        <p className="text-sm text-slate-600 mb-4">
          Score FejKing (0–100) jest obliczany jako średnia ważona pięciu komponentów.
          Im wyższy score, tym więcej dezinformacji wykryto w postach danego profilu w danym tygodniu.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(TECHNIQUE_LABELS).map(([key, label]) => (
            <div key={key} className="flex gap-2">
              <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-2.5 py-0.5 shrink-0 self-start mt-0.5">
                {label}
              </span>
            </div>
          ))}
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
    falsehood: 'Odsetek i dotkliwość fałszywych twierdzeń w postach',
    technique: 'Liczba i różnorodność zastosowanych technik manipulacji',
    reach: 'Zasięg postów mierzony wyświetleniami i udostępnieniami',
    repeat: 'Regularność publikowania treści dezinformacyjnych',
    community_notes: 'Notatki społeczności 𝕏 oznaczające posty jako misleading',
  };
  return desc[key] || '';
}
