export interface ClassInfo {
  subject: string;
  subjectFullName: string;
  semester: string;
  room: string;
  colors: {
    gradient: string;
    border: string;
    highlight: string;
  };
  icon: string;
  span?: number;
}

export type DaySchedule = ClassInfo[] | null | 'SPAN';

export interface TimeSlot {
  time: string;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
}

export type ScheduleView = 'table' | 'list' | 'magazine';