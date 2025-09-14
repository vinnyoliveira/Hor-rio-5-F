import React from 'react';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants';
import type { TimeSlot, ClassInfo } from '../../types';

interface MagazineViewProps {
  scheduleData: TimeSlot[];
  highlightedClassInfo: { rowIndex: number; dayIndex: number };
  currentDayIndex: number;
}

const MagazineView: React.FC<MagazineViewProps> = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  return (
    <div className="p-2 sm:p-4 space-y-8">
      {DAYS_OF_WEEK.map((day, dayIndex) => {
        const dayKey = DAYS_OF_WEEK_KEYS[dayIndex];
        const classesForDay = scheduleData
          .map((slot, rowIndex) => ({ ...slot, rowIndex }))
          .filter(slot => {
            const daySchedule = slot[dayKey];
            return Array.isArray(daySchedule) && daySchedule.length > 0;
          });
        
        if (classesForDay.length === 0) return null;

        return (
          <section 
            key={day}
            className={`bg-gray-900/40 border border-gray-800 rounded-2xl p-4 sm:p-6 transition-all duration-300 ${dayIndex === currentDayIndex ? 'border-indigo-500/50 shadow-lg' : ''}`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${dayIndex === currentDayIndex ? 'text-indigo-300' : 'text-gray-300'}`}>
              {day}
            </h2>
            <div className="divide-y divide-gray-800">
              {classesForDay.map(slot => {
                const daySchedule = slot[dayKey] as ClassInfo[];
                return daySchedule.map((classInfo, classIndex) => {
                  const isCurrent = slot.rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex;
                  return (
                    <div
                      key={`${slot.time}-${classIndex}`}
                      className={`relative flex items-center gap-4 py-4 transition-all duration-300 ${isCurrent ? 'scale-[1.02]' : ''}`}
                    >
                      {isCurrent && (
                        <div className={`absolute -left-4 sm:-left-6 top-0 bottom-0 w-1.5 rounded-full ${classInfo.colors.highlight.replace('ring-', 'bg-')}`}></div>
                      )}
                      
                      <div className="flex flex-col items-center justify-center w-20 text-center flex-shrink-0">
                        <p className="font-bold text-gray-200">{slot.time.split(' - ')[0]}</p>
                        <p className="text-sm text-gray-400">{slot.time.split(' - ')[1]}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 flex-grow">
                        <div className={`text-4xl p-3 rounded-full bg-gradient-to-br ${classInfo.colors.gradient}`}>
                          {classInfo.icon}
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-lg text-white">{classInfo.subjectFullName}</p>
                          <p className="text-sm text-gray-400">{classInfo.room}</p>
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </div>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MagazineView;