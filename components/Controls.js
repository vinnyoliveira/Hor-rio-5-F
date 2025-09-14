import React, { useState } from 'react';
import ViewSwitcher from './ViewSwitcher.js';
import FilterModal from './FilterModal.js';

const Controls = (props) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return React.createElement(React.Fragment, null,
    React.createElement("div", { className: "fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full shadow-2xl p-2" },
      props.showInstallButton && React.createElement("button", {
        onClick: props.onInstallClick,
        className: "flex items-center justify-center h-12 w-12 bg-gray-800/60 rounded-full text-gray-300 hover:bg-indigo-600/80 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none",
        "aria-label": "Instalar Aplicação"
      },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
          React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })
        )
      ),
      React.createElement("button", {
        onClick: () => setIsFilterModalOpen(true),
        className: "relative flex items-center justify-center h-12 w-12 bg-gray-800/60 rounded-full text-gray-300 hover:bg-indigo-600/80 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none",
        "aria-label": "Filtrar Matérias"
      },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", viewBox: "0 0 20 20", fill: "currentColor" },
          React.createElement("path", { fillRule: "evenodd", d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z", clipRule: "evenodd" })
        ),
        props.activeFilters.length > 0 && React.createElement("span", { className: "absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-900/80" },
          props.activeFilters.length
        )
      ),
      React.createElement(ViewSwitcher, { currentView: props.currentView, onViewChange: props.onViewChange })
    ),
    React.createElement(FilterModal, {
      isOpen: isFilterModalOpen,
      onClose: () => setIsFilterModalOpen(false),
      ...props
    })
  );
};

export default Controls;
