import React from 'react';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants';
import type { TimeSlot, ClassInfo } from '../../types';

interface ListViewProps {
  scheduleData: TimeSlot[];
  highlightedClassInfo: { rowIndex: number; dayIndex: number };
  currentDayIndex: number;
}

const ListView: React.FC<ListViewProps> = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  return (
    <div className="p-2 sm:p-4 space-y-8">
      {DAYS_OF_WEEK.map((day, dayIndex) => {
        const dayKey = DAYS_OF_WEEK_KEYS[dayIndex];
        const classesForDay = scheduleData.map((slot, rowIndex) => ({ ...slot, rowIndex })).filter(slot => slot[dayKey] && slot[dayKey] !== 'SPAN');
        
        if (classesForDay.length === 0) return null;

        return (
          <div key={day}>
            <h2 className={`text-xl font-bold text-center sm:text-left mb-4 p-2 rounded-md ${dayIndex === currentDayIndex ? 'bg-gray-800/80 text-indigo-300' : 'text-gray-400'}`}>
              {day}
            </h2>
            <div className="space-y-3">
              {classesForDay.map(slot => {
                const daySchedule = slot[dayKey] as ClassInfo[];
                return daySchedule.map((classInfo, classIndex) => {
                  const isCurrent = slot.rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex;
                  return (
                    <div
                      key={`${slot.time}-${classIndex}`}
                      className={`relative grid grid-cols-[auto,1fr] items-center gap-4 p-3 rounded-lg border-l-4 transition-all duration-300 bg-gradient-to-r text-white ${classInfo.colors.gradient} ${classInfo.colors.border} ${isCurrent ? `ring-4 ring-offset-2 ${classInfo.colors.highlight} ring-offset-gray-950 scale-[1.02]` : ''}`}
                    >
                      <div className="text-center w-24 flex-shrink-0 border-r border-white/10 pr-4">
                        <p className="font-bold text-lg">{slot.time.split(' - ')[0]}</p>
                        <p className="text-sm opacity-80">{slot.time.split(' - ')[1]}</p>
                      </div>
                      
                      <div className="grid grid-cols-[auto,1fr] items-center gap-4">
                        <div className="text-4xl">{classInfo.icon}</div>
                        <div className="flex-grow">
                          <p className="font-bold text-lg">{classInfo.subjectFullName}</p>
                          <p className="text-sm opacity-90">{classInfo.room}</p>
                        </div>
                      </div>
                       {isCurrent && (
                        <div className="absolute top-3 right-3 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </div>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;