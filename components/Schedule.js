import { jsx as _jsx } from 'react/jsx-runtime';
import React, { useMemo, useState, useEffect } from 'react';
import { SCHEDULE_DATA, DAYS_OF_WEEK_KEYS } from '../constants.js';
import { useCurrentTime } from '../hooks/useCurrentTime.js';
import TableView from './views/TableView.js';
import ListView from './views/ListView.js';
import MagazineView from './views/MagazineView.js';

const Schedule = ({ view, activeFilters }) => {
  const currentTime = useCurrentTime();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300); // Duration of the transition
    return () => clearTimeout(timer);
  }, [view, activeFilters]);

  const filteredScheduleData = useMemo(() => {
    if (activeFilters.length === 0) return SCHEDULE_DATA;

    const dataCopy = JSON.parse(JSON.stringify(SCHEDULE_DATA));

    dataCopy.forEach((slot, rowIndex) => {
      DAYS_OF_WEEK_KEYS.forEach(dayKey => {
        const daySchedule = slot[dayKey];
        if (Array.isArray(daySchedule)) {
          const originalClass = (SCHEDULE_DATA[rowIndex][dayKey])[0];
          const filteredClasses = daySchedule.filter(c => activeFilters.includes(c.subject));
          
          if (filteredClasses.length === 0) {
            slot[dayKey] = null;
            // If the filtered class was a spanning class, nullify subsequent SPANs
            if (originalClass?.span && originalClass.span > 1) {
              for (let i = 1; i < originalClass.span; i++) {
                if (rowIndex + i < dataCopy.length) {
                  dataCopy[rowIndex + i][dayKey] = null;
                }
              }
            }
          } else {
            slot[dayKey] = filteredClasses;
          }
        }
      });
    });

    return dataCopy;
  }, [activeFilters]);
  
  const currentDayIndex = Math.max(0, Math.min(4, currentTime.getDay() - 1));
  const isWeekend = currentTime.getDay() === 0 || currentTime.getDay() === 6;

  const isCurrentTimeSlot = (timeSlot) => {
    if (isWeekend) return false;
    const [startTimeStr, endTimeStr] = timeSlot.split(' - ');
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);
    const [endHour, endMinute] = endTimeStr.split(':').map(Number);

    const now = currentTime;
    const start = new Date(now);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(now);
    end.setHours(endHour, endMinute, 0, 0);
    
    return now >= start && now < end;
  };

  const currentSlotIndex = SCHEDULE_DATA.findIndex(slot => isCurrentTimeSlot(slot.time));
  
  let highlightedClassInfo = { rowIndex: -1, dayIndex: -1 };
  if (currentSlotIndex !== -1) {
    const currentDayKey = DAYS_OF_WEEK_KEYS[currentDayIndex];
    const scheduleItemForCurrentSlot = SCHEDULE_DATA[currentSlotIndex][currentDayKey];
    if (Array.isArray(scheduleItemForCurrentSlot)) {
      highlightedClassInfo = { rowIndex: currentSlotIndex, dayIndex: currentDayIndex };
    } else if (scheduleItemForCurrentSlot === 'SPAN') {
      for (let i = currentSlotIndex - 1; i >= 0; i--) {
        const prevScheduleItem = SCHEDULE_DATA[i][currentDayKey];
        if (Array.isArray(prevScheduleItem)) {
          highlightedClassInfo = { rowIndex: i, dayIndex: currentDayIndex };
          break;
        }
      }
    }
  }

  const renderView = () => {
    const props = {
      scheduleData: filteredScheduleData,
      highlightedClassInfo,
      currentDayIndex,
    };
    switch (view) {
      case 'list':
        return _jsx(ListView, { ...props });
      case 'magazine':
        return _jsx(MagazineView, { ...props });
      case 'table':
      default:
        return _jsx(TableView, { ...props });
    }
  };

  return (
    _jsx("div", {
      className: `transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`,
      children: renderView()
    })
  );
};

export default Schedule;