import React from 'react';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants.js';

const ListView = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  return React.createElement("div", { className: "p-2 sm:p-4 space-y-8" },
    DAYS_OF_WEEK.map((day, dayIndex) => {
      const dayKey = DAYS_OF_WEEK_KEYS[dayIndex];
      const classesForDay = scheduleData.map((slot, rowIndex) => ({ ...slot, rowIndex })).filter(slot => slot[dayKey] && slot[dayKey] !== 'SPAN');
      
      if (classesForDay.length === 0) return null;

      return React.createElement("div", { key: day },
        React.createElement("h2", { className: `text-xl font-bold text-center sm:text-left mb-4 p-2 rounded-md ${dayIndex === currentDayIndex ? 'bg-gray-800/80 text-indigo-300' : 'text-gray-400'}` },
          day
        ),
        React.createElement("div", { className: "space-y-3" },
          classesForDay.map(slot => {
            const daySchedule = slot[dayKey];
            return daySchedule.map((classInfo, classIndex) => {
              const isCurrent = slot.rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex;
              return React.createElement("div", {
                  key: `${slot.time}-${classIndex}`,
                  className: `relative grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-lg border-l-4 transition-all duration-300 bg-gradient-to-r text-white ${classInfo.colors.gradient} ${classInfo.colors.border} ${isCurrent ? `ring-4 ring-offset-2 ${classInfo.colors.highlight} ring-offset-gray-950 scale-[1.02]` : ''}`
                },
                React.createElement("div", { className: "text-center w-24 flex-shrink-0 border-r border-white/10 pr-4" },
                  React.createElement("p", { className: "font-bold text-lg" }, slot.time.split(' - ')[0]),
                  React.createElement("p", { className: "text-sm opacity-80" }, slot.time.split(' - ')[1])
                ),
                React.createElement("div", { className: "grid grid-cols-[auto,1fr] items-center gap-4" },
                  React.createElement("div", { className: "text-4xl" }, classInfo.icon),
                  React.createElement("div", { className: "flex-grow" },
                    React.createElement("p", { className: "font-bold text-lg" }, classInfo.subjectFullName),
                    React.createElement("p", { className: "text-sm opacity-90" }, classInfo.room)
                  )
                ),
                isCurrent && (
                  React.createElement("div", { className: "absolute top-3 right-3 flex h-3 w-3" },
                    React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                    React.createElement("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-red-500" })
                  )
                )
              );
            });
          })
        )
      );
    })
  );
};

export default ListView;
