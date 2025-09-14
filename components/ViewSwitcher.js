import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';

const views = [
  { 
    id: 'table', 
    label: 'Tabela', 
    icon: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z", clipRule: "evenodd" }) }) 
  },
  { 
    id: 'list', 
    label: 'Lista', 
    icon: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" }) })
  },
];

const ViewSwitcher = ({ currentView, onViewChange }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef([]);
  const containerRef = useRef(null);

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
    _jsxs("div", {
      ref: containerRef,
      className: "relative flex items-center bg-gray-800/60 p-1 rounded-full",
      children: [
        _jsx("div", {
          className: "absolute top-1 bottom-1 bg-indigo-600 rounded-full shadow-lg transition-all duration-300 ease-in-out",
          style: indicatorStyle
        }),
        views.map((view, index) => (
          _jsxs("button", {
            ref: el => { if(el) buttonsRef.current[index] = el },
            onClick: () => onViewChange(view.id),
            className: `relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out focus:outline-none ${currentView === view.id ? 'text-white' : 'text-gray-300 hover:text-white'}`,
            "aria-pressed": currentView === view.id,
            children: [
              view.icon,
              _jsx("span", { children: view.label })
            ]
          }, view.id)
        ))
      ]
    })
  );
};

export default ViewSwitcher;
