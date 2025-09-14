import React from 'react';

const ScheduleCell = ({ daySchedule, isCurrent, isCurrentDay }) => {
  if (daySchedule === 'SPAN') {
    return null; // This cell is covered by a spanning cell from above
  }

  const baseCellClasses = "rounded-lg transition-all duration-300 ease-in-out";
  const currentDayBg = isCurrentDay ? 'bg-gray-800/40' : 'bg-gray-900/20';

  if (!daySchedule) {
    return React.createElement("div", { className: `min-h-[90px] ${baseCellClasses} ${currentDayBg} border border-transparent` });
  }
  
  const span = daySchedule[0]?.span || 1;
  const gridRowStyle = span > 1 ? { gridRow: `span ${span}` } : {};
  const heightClass = span === 1 ? 'min-h-[90px]' : '';
  const containerClasses = daySchedule.length > 1 ? "flex h-full gap-1" : "h-full";

  // Determine the highlight based on the first class in the slot
  const currentCellHighlight = isCurrent ? `ring-4 ring-offset-2 ${daySchedule[0].colors.highlight} ring-offset-gray-950 shadow-xl scale-105 z-20` : "";

  return React.createElement("div", { 
      style: gridRowStyle,
      className: `${heightClass} ${baseCellClasses} border-transparent relative group`
    },
    React.createElement("div", { className: `${containerClasses}` },
      daySchedule.map((classInfo, index) => (
        React.createElement("div", { key: index, className: `relative flex-1 p-2 rounded-md flex flex-col justify-between bg-gradient-to-br ${classInfo.colors.gradient} ${classInfo.colors.border} border ${currentCellHighlight} h-full text-white` },
          isCurrent && (
            React.createElement("span", { className: "absolute top-2.5 right-2.5 flex h-3 w-3" },
              React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
              React.createElement("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-red-500" })
            )
          ),
          React.createElement("div", { className: "flex flex-col items-center text-center" },
            React.createElement("span", { className: "text-3xl", role: "img", "aria-label": classInfo.subjectFullName }, classInfo.icon),
            React.createElement("p", { className: "font-bold text-lg mt-1" }, classInfo.subject)
          ),
          React.createElement("p", { className: "text-sm font-semibold self-end opacity-90" }, classInfo.room)
        )
      ))
    ),
    React.createElement("div", { className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-3 bg-black border border-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" },
      React.createElement("p", { className: "font-bold text-base text-indigo-300" }, daySchedule.map(c => c.subjectFullName).join(' / ')),
      React.createElement("hr", { className: "my-1 border-gray-700" }),
      React.createElement("p", null, React.createElement("span", { className: "font-semibold text-gray-400" }, "Sala:"), " " + daySchedule.map(c => c.room).join(' / ')),
      React.createElement("p", null, React.createElement("span", { className: "font-semibold text-gray-400" }, "Turma:"), " 5ºF"),
      React.createElement("p", null, React.createElement("span", { className: "font-semibold text-gray-400" }, "Duração:"), " " + daySchedule.map(c => c.semester).join(' / ')),
      React.createElement("div", { className: "absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black" })
    )
  );
};

export default ScheduleCell;
