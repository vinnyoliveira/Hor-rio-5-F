import React from 'react';
import type { DaySchedule } from '../types';

interface ScheduleCellProps {
  daySchedule: DaySchedule;
  isCurrent: boolean;
  isCurrentDay: boolean;
}

const ScheduleCell: React.FC<ScheduleCellProps> = ({ daySchedule, isCurrent, isCurrentDay }) => {
  if (daySchedule === 'SPAN') {
    return null; // This cell is covered by a spanning cell from above
  }

  const baseCellClasses = "rounded-lg transition-all duration-300 ease-in-out";
  const currentDayBg = isCurrentDay ? 'bg-gray-800/40' : 'bg-gray-900/20';

  if (!daySchedule) {
    return <div className={`min-h-[90px] ${baseCellClasses} ${currentDayBg} border border-transparent`}></div>;
  }
  
  const span = daySchedule[0]?.span || 1;
  const gridRowStyle = span > 1 ? { gridRow: `span ${span}` } : {};
  const heightClass = span === 1 ? 'min-h-[90px]' : '';
  const containerClasses = daySchedule.length > 1 ? "flex h-full gap-1" : "h-full";

  // Determine the highlight based on the first class in the slot
  const currentCellHighlight = isCurrent ? `ring-4 ring-offset-2 ${daySchedule[0].colors.highlight} ring-offset-gray-950 shadow-xl scale-105 z-20` : "";

  return (
    <div 
      style={gridRowStyle}
      className={`${heightClass} ${baseCellClasses} border-transparent relative group`}
    >
       {/* Container for one or more classes in the same slot */}
      <div className={`${containerClasses}`}>
        {daySchedule.map((classInfo, index) => (
          <div key={index} className={`relative flex-1 p-2 rounded-md flex flex-col justify-between bg-gradient-to-br ${classInfo.colors.gradient} ${classInfo.colors.border} border ${currentCellHighlight} h-full text-white`}>
            {isCurrent && (
              <span className="absolute top-2.5 right-2.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl" role="img" aria-label={classInfo.subjectFullName}>{classInfo.icon}</span>
              <p className="font-bold text-lg mt-1">{classInfo.subject}</p>
            </div>
            <p className="text-sm font-semibold self-end opacity-90">{classInfo.room}</p>
          </div>
        ))}
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-3
                      bg-black border border-gray-700 text-white text-sm rounded-lg shadow-lg
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      pointer-events-none z-30">
        <p className="font-bold text-base text-indigo-300">{daySchedule.map(c => c.subjectFullName).join(' / ')}</p>
        <hr className="my-1 border-gray-700"/>
        <p><span className="font-semibold text-gray-400">Sala:</span> {daySchedule.map(c => c.room).join(' / ')}</p>
        <p><span className="font-semibold text-gray-400">Turma:</span> 5ºF</p>
        <p><span className="font-semibold text-gray-400">Duração:</span> {daySchedule.map(c => c.semester).join(' / ')}</p>
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
                        border-x-8 border-x-transparent
                        border-t-8 border-t-black"></div>
      </div>
    </div>
  );
};

export default ScheduleCell;