import React, { useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: { key: string; fullName: string; icon: string }[];
  activeFilters: string[];
  onFilterChange: (subject: string) => void;
  onClearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, subjects, activeFilters, onFilterChange, onClearFilters }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Filtrar Matérias</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="p-4 overflow-y-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {subjects.map(subject => (
              <li key={subject.key}>
                <label className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${activeFilters.includes(subject.key) ? 'bg-indigo-600/30 border-indigo-500' : 'bg-gray-800/50 border-transparent hover:border-gray-600'}`}>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-sm bg-gray-700 border-gray-600 text-indigo-500 focus:ring-0 focus:ring-offset-0"
                    checked={activeFilters.includes(subject.key)}
                    onChange={() => onFilterChange(subject.key)}
                  />
                  <span className="text-3xl">{subject.icon}</span>
                  <span className="font-medium text-gray-200">{subject.fullName}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <footer className="flex items-center justify-between p-4 mt-auto border-t border-gray-700">
           <button
            onClick={onClearFilters}
            disabled={activeFilters.length === 0}
            className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700/50 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Limpar Filtros ({activeFilters.length})
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default FilterModal;
