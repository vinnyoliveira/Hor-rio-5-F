import React, { useState, useEffect, useRef } from 'react';
import type { ScheduleView } from '../types';

interface ViewSwitcherProps {
  currentView: ScheduleView;
  onViewChange: (view: ScheduleView) => void;
}

const views: { id: ScheduleView; label: string; icon: JSX.Element }[] = [
  { 
    id: 'table', 
    label: 'Tabela', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" /></svg> 
  },
  { 
    id: 'list', 
    label: 'Lista', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
  },
];

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onViewChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = views.findIndex(v => v.id === currentView);
    const activeButton = buttonsRef.current[activeIndex];
    const container = containerRef.current;
    
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        width: buttonRect.width,
        transform: `translateX(${buttonRect.left - containerRect.left}px)`,
      });
    }
  }, [currentView, views]);

  return (
    <div ref={containerRef} className="relative flex items-center bg-gray-800/60 p-1 rounded-full">
      <div 
        className="absolute top-1 bottom-1 bg-indigo-600 rounded-full shadow-lg transition-all duration-300 ease-in-out" 
        style={indicatorStyle} 
      />
      {views.map((view, index) => (
        <button
          key={view.id}
          ref={el => { if(el) buttonsRef.current[index] = el }}
          onClick={() => onViewChange(view.id)}
          className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out focus:outline-none
            ${currentView === view.id ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          aria-pressed={currentView === view.id}
        >
          {view.icon}
          <span>{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewSwitcher;
