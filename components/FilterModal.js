import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React, { useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, subjects, activeFilters, onFilterChange, onClearFilters }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    _jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md",
      onClick: onClose,
      "aria-modal": "true",
      role: "dialog",
      children: _jsxs("div", {
        className: "relative bg-gray-900/70 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col",
        onClick: e => e.stopPropagation(),
        children: [
          _jsxs("header", {
            className: "flex items-center justify-between p-4 border-b border-gray-700",
            children: [
              _jsx("h2", {
                className: "text-xl font-bold text-white",
                children: "Filtrar Mat\u00E9rias"
              }),
              _jsx("button", {
                onClick: onClose,
                className: "p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors",
                "aria-label": "Fechar",
                children: _jsx("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-6 w-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: _jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  })
                })
              })
            ]
          }),
          _jsx("div", {
            className: "p-4 overflow-y-auto",
            children: _jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
              children: subjects.map(subject => (
                _jsx("li", {
                  children: _jsxs("label", {
                    className: `flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${activeFilters.includes(subject.key) ? 'bg-indigo-600/30 border-indigo-500' : 'bg-gray-800/50 border-transparent hover:border-gray-600'}`,
                    children: [
                      _jsx("input", {
                        type: "checkbox",
                        className: "h-5 w-5 rounded-sm bg-gray-700 border-gray-600 text-indigo-500 focus:ring-0 focus:ring-offset-0",
                        checked: activeFilters.includes(subject.key),
                        onChange: () => onFilterChange(subject.key)
                      }),
                      _jsx("span", {
                        className: "text-3xl",
                        children: subject.icon
                      }),
                      _jsx("span", {
                        className: "font-medium text-gray-200",
                        children: subject.fullName
                      })
                    ]
                  })
                }, subject.key)
              ))
            })
          }),
          _jsxs("footer", {
            className: "flex items-center justify-between p-4 mt-auto border-t border-gray-700",
            children: [
              _jsxs("button", {
                onClick: onClearFilters,
                disabled: activeFilters.length === 0,
                className: "px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700/50 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                children: [
                  "Limpar Filtros (",
                  activeFilters.length,
                  ")"
                ]
              }),
              _jsx("button", {
                onClick: onClose,
                className: "px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors",
                children: "Fechar"
              })
            ]
          })
        ]
      })
    })
  );
};

export default FilterModal;
