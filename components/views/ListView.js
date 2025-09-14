import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants.js';

const ListView = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  return (
    _jsx("div", {
      className: "p-2 sm:p-4 space-y-8",
      children: DAYS_OF_WEEK.map((day, dayIndex) => {
        const dayKey = DAYS_OF_WEEK_KEYS[dayIndex];
        const classesForDay = scheduleData.map((slot, rowIndex) => ({ ...slot, rowIndex })).filter(slot => slot[dayKey] && slot[dayKey] !== 'SPAN');
        
        if (classesForDay.length === 0) return null;

        return (
          _jsxs("div", {
            children: [
              _jsx("h2", {
                className: `text-xl font-bold text-center sm:text-left mb-4 p-2 rounded-md ${dayIndex === currentDayIndex ? 'bg-gray-800/80 text-indigo-300' : 'text-gray-400'}`,
                children: day
              }),
              _jsx("div", {
                className: "space-y-3",
                children: classesForDay.map(slot => {
                  const daySchedule = slot[dayKey];
                  return daySchedule.map((classInfo, classIndex) => {
                    const isCurrent = slot.rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex;
                    return (
                      _jsxs("div", {
                        className: `relative grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-lg border-l-4 transition-all duration-300 bg-gradient-to-r text-white ${classInfo.colors.gradient} ${classInfo.colors.border} ${isCurrent ? `ring-4 ring-offset-2 ${classInfo.colors.highlight} ring-offset-gray-950 scale-[1.02]` : ''}`,
                        children: [
                          _jsxs("div", {
                            className: "text-center w-24 flex-shrink-0 border-r border-white/10 pr-4",
                            children: [
                              _jsx("p", {
                                className: "font-bold text-lg",
                                children: slot.time.split(' - ')[0]
                              }),
                              _jsx("p", {
                                className: "text-sm opacity-80",
                                children: slot.time.split(' - ')[1]
                              })
                            ]
                          }),
                          _jsxs("div", {
                            className: "grid grid-cols-[auto,1fr] items-center gap-4",
                            children: [
                              _jsx("div", {
                                className: "text-4xl",
                                children: classInfo.icon
                              }),
                              _jsxs("div", {
                                className: "flex-grow",
                                children: [
                                  _jsx("p", {
                                    className: "font-bold text-lg",
                                    children: classInfo.subjectFullName
                                  }),
                                  _jsx("p", {
                                    className: "text-sm opacity-90",
                                    children: classInfo.room
                                  })
                                ]
                              })
                            ]
                          }),
                          isCurrent && (
                            _jsxs("div", {
                              className: "absolute top-3 right-3 flex h-3 w-3",
                              children: [
                                _jsx("span", {
                                  className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                                }),
                                _jsx("span", {
                                  className: "relative inline-flex rounded-full h-3 w-3 bg-red-500"
                                })
                              ]
                            })
                          )
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

export default ListView;
