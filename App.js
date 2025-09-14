import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useMemo, useEffect } from 'react';
import Schedule from './components/Schedule.js';
import { ALL_SUBJECTS, SCHEDULE_DATA, DAYS_OF_WEEK_KEYS, DAYS_OF_WEEK } from './constants.js';
import Controls from './components/Controls.js';
import NextClassNotifier from './components/NextClassNotifier.js';
import { useCurrentTime } from './hooks/useCurrentTime.js';

const findNextClass = (schedule, now) => {
  const currentDayIndex = now.getDay() - 1; // Monday = 0, Sunday = 6
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  // Function to parse start time from "HH:MM - HH:MM"
  const getStartTimeInMinutes = (time) => {
    const [start] = time.split(' - ');
    const [h, m] = start.split(':').map(Number);
    return h * 60 + m;
  };

  // Search for the next class starting from today
  for (let d = currentDayIndex; d < 5; d++) {
    if (d < 0) continue; // Skip weekends
    const dayKey = DAYS_OF_WEEK_KEYS[d];
    for (const slot of schedule) {
      const isToday = d === currentDayIndex;
      const startTime = getStartTimeInMinutes(slot.time);

      if (isToday && startTime <= currentTimeInMinutes) {
        continue; // Skip past classes for today
      }
      
      const daySchedule = slot[dayKey];
      if (Array.isArray(daySchedule) && daySchedule.length > 0) {
        return {
          classInfo: daySchedule[0],
          time: slot.time,
          day: DAYS_OF_WEEK[d],
        };
      }
    }
  }

  // If no class found for the rest of the week, check next week's Monday
  const mondayKey = DAYS_OF_WEEK_KEYS[0];
  for (const slot of schedule) {
    const daySchedule = slot[mondayKey];
    if (Array.isArray(daySchedule) && daySchedule.length > 0) {
      return {
        classInfo: daySchedule[0],
        time: slot.time,
        day: DAYS_OF_WEEK[0],
      };
    }
  }

  return null;
};

const App = () => {
  const [view, setView] = useState('table');
  const [activeFilters, setActiveFilters] = useState([]);
  const [updateRegistration, setUpdateRegistration] = useState(null);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const currentTime = useCurrentTime();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const handleNewVersion = (event) => {
      const customEvent = event;
      setUpdateRegistration(customEvent.detail);
    };
    window.addEventListener('newVersionReady', handleNewVersion);
    return () => window.removeEventListener('newVersionReady', handleNewVersion);
  }, []);

  useEffect(() => {
    // When an update is applied and the controller changes, reload the page
    if (updateRegistration) {
      const handleControllerChange = () => {
        window.location.reload();
      };
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
      return () => navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    }
  }, [updateRegistration]);


  const applyUpdate = () => {
    if (updateRegistration && updateRegistration.waiting) {
      updateRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setInstallPromptEvent(null);
  };


  const handleFilterChange = useCallback((subject) => {
    setActiveFilters(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const nextClass = useMemo(() => findNextClass(SCHEDULE_DATA, currentTime), [currentTime]);

  return (
    _jsx("div", {
      className: "min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-2 sm:p-4 md:p-6",
      children: _jsxs("div", {
        className: "w-full max-w-7xl mx-auto pb-28",
        children: [
          _jsxs("header", {
            className: "mb-6 text-center",
            children: [
              _jsx("h1", {
                className: "text-3xl sm:text-4xl font-bold text-gray-200",
                children: "AGRUPAMENTO DE ESCOLAS J\u00DADICE FIALHO"
              }),
              _jsx("p", {
                className: "text-lg text-gray-300 mt-1",
                children: "Ano Letivo: 2025/2026"
              }),
              _jsx("p", {
                className: "text-xl font-semibold text-indigo-400 mt-2",
                children: "Turma: 5\u00BAF"
              })
            ]
          }),
          _jsx(NextClassNotifier, { nextClass: nextClass }),
          _jsx("main", {
            className: "mt-6 bg-black/30 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-lg overflow-hidden",
            children: _jsx(Schedule, {
              view: view,
              activeFilters: activeFilters
            })
          }),
          _jsx(Controls, {
            subjects: ALL_SUBJECTS,
            activeFilters: activeFilters,
            onFilterChange: handleFilterChange,
            onClearFilters: clearFilters,
            currentView: view,
            onViewChange: setView,
            showInstallButton: !!installPromptEvent,
            onInstallClick: handleInstallClick
          }),
          updateRegistration && (_jsx("div", {
            className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-50",
            children: _jsxs("div", {
              className: "flex items-center gap-4 bg-gray-800 backdrop-blur-md border border-gray-700 rounded-lg p-3 shadow-lg animate-fade-in-up",
              children: [
                _jsx("p", {
                  className: "text-white font-semibold",
                  children: "Nova vers\u00E3o dispon\u00EDvel!"
                }),
                _jsx("button", {
                  onClick: applyUpdate,
                  className: "px-4 py-1.5 font-bold text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors",
                  children: "Atualizar"
                })
              ]
            })
          })),
          _jsx("footer", {
            className: "text-center mt-20 mb-6 text-sm text-gray-500",
            children: _jsx("p", {
              children: "Entrada em Vigor: 01 de setembro de 2025 | Data de validade: 31 de agosto de 2026"
            })
          })
        ]
      })
    })
  );
};

export default App;