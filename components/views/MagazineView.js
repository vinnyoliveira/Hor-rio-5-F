import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants.js';

const MagazineView = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  return (
    _jsx("div", {
      className: "p-2 sm:p-4 space-y-8",
      children: DAYS_OF_WEEK.map((day, dayIndex) => {
        const dayKey = DAYS_OF_WEEK_KEYS[dayIndex];
        const classesForDay = scheduleData
          .map((slot, rowIndex) => ({ ...slot, rowIndex }))
          .filter(slot => {
            const daySchedule = slot[dayKey];
            return Array.isArray(daySchedule) && daySchedule.length > 0;
          });
        
        if (classesForDay.length === 0) return null;

        return (
          _jsxs("section", {
            className: `bg-gray-900/40 border border-gray-800 rounded-2xl p-4 sm:p-6 transition-all duration-300 ${dayIndex === currentDayIndex ? 'border-indigo-500/50 shadow-lg' : ''}`,
            children: [
              _jsx("h2", {
                className: `text-2xl font-bold mb-4 ${dayIndex === currentDayIndex ? 'text-indigo-300' : 'text-gray-300'}`,
                children: day
              }),
              _jsx("div", {
                className: "divide-y divide-gray-800",
                children: classesForDay.map(slot => {
                  const daySchedule = slot[dayKey];
                  return daySchedule.map((classInfo, classIndex) => {
                    const isCurrent = slot.rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex;
                    return (
                      _jsxs("div", {
                        className: `relative flex items-center gap-4 py-4 transition-all duration-300 ${isCurrent ? 'scale-[1.02]' : ''}`,
                        children: [
                          isCurrent && (_jsx("div", {
                            className: `absolute -left-4 sm:-left-6 top-0 bottom-0 w-1.5 rounded-full ${classInfo.colors.highlight.replace('ring-', 'bg-')}`
                          })),
                          _jsxs("div", {
                            className: "flex flex-col items-center justify-center w-20 text-center flex-shrink-0",
                            children: [
                              _jsx("p", {
                                className: "font-bold text-gray-200",
                                children: slot.time.split(' - ')[0]
                              }),
                              _jsx("p", {
                                className: "text-sm text-gray-400",
                                children: slot.time.split(' - ')[1]
                              })
                            ]
                          }),
                          _jsxs("div", {
                            className: "flex items-center gap-4 flex-grow",
                            children: [
                              _jsx("div", {
                                className: `text-4xl p-3 rounded-full bg-gradient-to-br ${classInfo.colors.gradient}`,
                                children: classInfo.icon
                              }),
                              _jsxs("div", {
                                className: "flex-grow",
                                children: [
                                  _jsx("p", {
                                    className: "font-bold text-lg text-white",
                                    children: classInfo.subjectFullName
                                  }),
                                  _jsx("p", {
                                    className: "text-sm text-gray-400",
                                    children: classInfo.room
                                  })
                                ]
                              })
                            ]
                          }),
                          isCurrent && (_jsxs("div", {
                            className: "absolute top-1/2 -translate-y-1/2 right-4 flex h-3 w-3",
                            children: [
                              _jsx("span", {
                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                              }),
                              _jsx("span", {
                                className: "relative inline-flex rounded-full h-3 w-3 bg-red-500"
                              })
                            ]
                          }))
                        ]
                      }, `${slot.time}-${classIndex}`)
                    );
                  });
                })
              })
            ]
          }, day)
        );
      })
    })
  );
};

export default MagazineView;