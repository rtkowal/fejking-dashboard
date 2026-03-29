import { DISCLAIMER } from '../../data/translations';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-6 mt-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          {DISCLAIMER}
        </p>
        <p className="text-xs text-slate-400 mt-3">
          FejKing © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
