import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const ScheduleCell = ({ daySchedule, isCurrent, isCurrentDay }) => {
  if (daySchedule === 'SPAN') {
    return null; // This cell is covered by a spanning cell from above
  }

  const baseCellClasses = "rounded-lg transition-all duration-300 ease-in-out";
  const currentDayBg = isCurrentDay ? 'bg-gray-800/40' : 'bg-gray-900/20';

  if (!daySchedule) {
    return _jsx("div", { className: `min-h-[90px] ${baseCellClasses} ${currentDayBg} border border-transparent` });
  }
  
  const span = daySchedule[0]?.span || 1;
  const gridRowStyle = span > 1 ? { gridRow: `span ${span}` } : {};
  const heightClass = span === 1 ? 'min-h-[90px]' : '';
  const containerClasses = daySchedule.length > 1 ? "flex h-full gap-1" : "h-full";

  // Determine the highlight based on the first class in the slot
  const currentCellHighlight = isCurrent ? `ring-4 ring-offset-2 ${daySchedule[0].colors.highlight} ring-offset-gray-950 shadow-xl scale-105 z-20` : "";

  return (
    _jsxs("div", {
      style: gridRowStyle,
      className: `${heightClass} ${baseCellClasses} border-transparent relative group`,
      children: [
        _jsx("div", {
          className: `${containerClasses}`,
          children: daySchedule.map((classInfo, index) => (
            _jsxs("div", {
              className: `relative flex-1 p-2 rounded-md flex flex-col justify-between bg-gradient-to-br ${classInfo.colors.gradient} ${classInfo.colors.border} border ${currentCellHighlight} h-full text-white`,
              children: [
                isCurrent && (
                  _jsxs("span", {
                    className: "absolute top-2.5 right-2.5 flex h-3 w-3",
                    children: [
                      _jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                      _jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-red-500" })
                    ]
                  })
                ),
                _jsxs("div", {
                  className: "flex flex-col items-center text-center",
                  children: [
                    _jsx("span", {
                      className: "text-3xl",
                      role: "img",
                      "aria-label": classInfo.subjectFullName,
                      children: classInfo.icon
                    }),
                    _jsx("p", {
                      className: "font-bold text-lg mt-1",
                      children: classInfo.subject
                    })
                  ]
                }),
                _jsx("p", {
                  className: "text-sm font-semibold self-end opacity-90",
                  children: classInfo.room
                })
              ]
            }, index)
          ))
        }),
        _jsxs("div", {
          className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-3 bg-black border border-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30",
          children: [
            _jsx("p", {
              className: "font-bold text-base text-indigo-300",
              children: daySchedule.map(c => c.subjectFullName).join(' / ')
            }),
            _jsx("hr", { className: "my-1 border-gray-700" }),
            _jsxs("p", {
              children: [
                _jsx("span", {
                  className: "font-semibold text-gray-400",
                  children: "Sala:"
                }),
                " ",
                daySchedule.map(c => c.room).join(' / ')
              ]
            }),
            _jsxs("p", {
              children: [
                _jsx("span", {
                  className: "font-semibold text-gray-400",
                  children: "Turma:"
                }),
                " 5\u00BAF"
              ]
            }),
            _jsxs("p", {
              children: [
                _jsx("span", {
                  className: "font-semibold text-gray-400",
                  children: "Dura\u00E7\u00E3o:"
                }),
                " ",
                daySchedule.map(c => c.semester).join(' / ')
              ]
            }),
            _jsx("div", {
              className: "absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"
            })
          ]
        })
      ]
    })
  );
};

export default ScheduleCell;
