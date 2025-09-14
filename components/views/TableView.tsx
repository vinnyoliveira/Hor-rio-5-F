import React, { useState, useEffect } from 'react';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_KEYS } from '../../constants';
import type { TimeSlot } from '../../types';
import ScheduleCell from '../ScheduleCell';

interface TableViewProps {
  scheduleData: TimeSlot[];
  highlightedClassInfo: { rowIndex: number; dayIndex: number };
  currentDayIndex: number;
}

const TableView: React.FC<TableViewProps> = ({ scheduleData, highlightedClassInfo, currentDayIndex }) => {
  const [mobileDayIndex, setMobileDayIndex] = useState(currentDayIndex);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Sync the viewed day with the actual current day if it changes
    setMobileDayIndex(currentDayIndex);
  }, [currentDayIndex]);

  if (isMobile) {
    const mobileDayKey = DAYS_OF_WEEK_KEYS[mobileDayIndex];
    
    return (
      <div className="grid grid-cols-[auto,1fr] gap-1 p-1 sm:p-2">
        {/* Mobile Header with Navigation */}
        <div className="sticky top-0 z-10 bg-black/30 backdrop-blur-sm"></div>
        <div className="sticky top-0 z-10 p-3 text-center font-bold text-gray-300 border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm flex items-center justify-between">
          <button
            onClick={() => setMobileDayIndex(prev => Math.max(0, prev - 1))}
            disabled={mobileDayIndex === 0}
            className="p-1 rounded-full text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous Day"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span>{DAYS_OF_WEEK[mobileDayIndex]}</span>
          <button
            onClick={() => setMobileDayIndex(prev => Math.min(4, prev + 1))}
            disabled={mobileDayIndex === 4}
            className="p-1 rounded-full text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next Day"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Schedule Rows */}
        {scheduleData.map((slot, rowIndex) => (
            <React.Fragment key={slot.time}>
              <div className="p-2 text-center font-semibold text-xs text-gray-400 bg-black/30 backdrop-blur-sm flex items-center justify-center sticky left-0 z-10 whitespace-pre">
                {slot.time.replace(' - ', '\n')}
              </div>
              <ScheduleCell
                key={`${slot.time}-${mobileDayKey}`}
                daySchedule={slot[mobileDayKey]}
                isCurrent={rowIndex === highlightedClassInfo.rowIndex && mobileDayIndex === highlightedClassInfo.dayIndex}
                isCurrentDay={mobileDayIndex === currentDayIndex}
              />
            </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] gap-1 p-1 sm:p-2">
      {/* Desktop Header */}
      <div className="sticky top-0 z-10 bg-black/30 backdrop-blur-sm"></div>
      {DAYS_OF_WEEK.map((day, dayIndex) => (
        <div key={day} className={`sticky top-0 z-10 p-3 text-center font-bold text-gray-300 border-b border-gray-800 transition-colors ${dayIndex === currentDayIndex ? 'bg-gray-900/60 backdrop-blur-sm' : 'bg-black/30 backdrop-blur-sm'}`}>
          {day}
        </div>
      ))}

      {/* Desktop Schedule Rows */}
      {scheduleData.map((slot: TimeSlot, rowIndex) => (
        <React.Fragment key={slot.time}>
          <div className="p-2 text-center font-semibold text-xs text-gray-400 bg-black/30 backdrop-blur-sm flex items-center justify-center sticky left-0 z-10 whitespace-pre">
            {slot.time.replace(' - ', '\n')}
          </div>
          {DAYS_OF_WEEK_KEYS.map((dayKey, dayIndex) => (
            <ScheduleCell
              key={`${slot.time}-${dayKey}`}
              daySchedule={slot[dayKey]}
              isCurrent={rowIndex === highlightedClassInfo.rowIndex && dayIndex === highlightedClassInfo.dayIndex}
              isCurrentDay={dayIndex === currentDayIndex}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TableView;