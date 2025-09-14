import type { ClassInfo, TimeSlot } from './types';

export const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
export const DAYS_OF_WEEK_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const;

const SUBJECT_DETAILS: { [key: string]: { fullName: string; icon: string; colors: { gradient: string; border: string; highlight: string; } } } = {
  'MAT': { fullName: 'Matemática', icon: '🧮', colors: { gradient: 'from-blue-600/30 to-black/20', border: 'border-blue-500/50', highlight: 'ring-blue-500' } },
  'PT': { fullName: 'Português', icon: '📚', colors: { gradient: 'from-emerald-600/30 to-black/20', border: 'border-emerald-500/50', highlight: 'ring-emerald-500' } },
  'ING': { fullName: 'Inglês', icon: '🗣️', colors: { gradient: 'from-yellow-500/30 to-black/20', border: 'border-yellow-400/50', highlight: 'ring-yellow-400' } },
  'CN': { fullName: 'Ciências Naturais', icon: '🌿', colors: { gradient: 'from-teal-600/30 to-black/20', border: 'border-teal-500/50', highlight: 'ring-teal-500' } },
  'HGP': { fullName: 'História e Geografia de Portugal', icon: '🗺️', colors: { gradient: 'from-orange-600/30 to-black/20', border: 'border-orange-500/50', highlight: 'ring-orange-500' } },
  'EF': { fullName: 'Educação Física', icon: '🤸', colors: { gradient: 'from-red-600/30 to-black/20', border: 'border-red-500/50', highlight: 'ring-red-500' } },
  'EV': { fullName: 'Educação Visual', icon: '🎨', colors: { gradient: 'from-purple-600/30 to-black/20', border: 'border-purple-500/50', highlight: 'ring-purple-500' } },
  'EM': { fullName: 'Educação Musical', icon: '🎵', colors: { gradient: 'from-pink-600/30 to-black/20', border: 'border-pink-500/50', highlight: 'ring-pink-500' } },
  'CID': { fullName: 'Cidadania e Desenvolvimento', icon: '🤝', colors: { gradient: 'from-indigo-600/30 to-black/20', border: 'border-indigo-500/50', highlight: 'ring-indigo-500' } },
  'TIC': { fullName: 'Tecnologias de Informação e Comunicação', icon: '💻', colors: { gradient: 'from-sky-600/30 to-black/20', border: 'border-sky-500/50', highlight: 'ring-sky-500' } },
  'ET': { fullName: 'Educação Tecnológica', icon: '⚙️', colors: { gradient: 'from-lime-600/30 to-black/20', border: 'border-lime-500/50', highlight: 'ring-lime-500' } },
  'DTAL': { fullName: 'Desenvolvimento de Técnicas de Apoio à Aprendizagem', icon: '✍️', colors: { gradient: 'from-gray-600/30 to-black/20', border: 'border-gray-500/50', highlight: 'ring-gray-500' } },
  'AMAT': { fullName: 'Apoio à Matemática', icon: '➕', colors: { gradient: 'from-stone-600/30 to-black/20', border: 'border-stone-500/50', highlight: 'ring-stone-500' } },
  'APT': { fullName: 'Apoio a Português', icon: '🧑‍🏫', colors: { gradient: 'from-amber-600/30 to-black/20', border: 'border-amber-500/50', highlight: 'ring-amber-500' } },
  'DEFAULT': { fullName: 'Desconhecido', icon: '❓', colors: { gradient: 'from-gray-700/30 to-black/20', border: 'border-gray-600/50', highlight: 'ring-gray-600' } },
};

const SEMESTER_MAP: { [key: string]: string } = {
  'A': 'Anual',
  '1S': '1º Semestre',
  '2S': '2º Semestre',
};

const ROOM_MAP: { [key: string]: string } = {
  'JF9': 'Sala 9',
  'JF2': 'Sala 2',
  'JF3': 'Sala 3',
  'JF14': 'Sala 14',
  'JF17': 'Sala 17',
  'JF36': 'Sala 36',
  'PAV': 'Pavilhão',
  'GIN': 'Ginásio',
};

const getClassInfo = (subject: string, semesterCode: string, room: string, span?: number): ClassInfo => {
  const details = SUBJECT_DETAILS[subject] || SUBJECT_DETAILS['DEFAULT'];
  return {
    subject,
    subjectFullName: details.fullName,
    icon: details.icon,
    colors: details.colors,
    semester: SEMESTER_MAP[semesterCode] || semesterCode,
    room: ROOM_MAP[room] || room,
    ...(span && { span }),
  };
};

export const SCHEDULE_DATA: TimeSlot[] = [
  { 
    time: '08:15 - 09:05', 
    monday: [getClassInfo('ING', 'A', 'JF9', 2)],
    tuesday: [getClassInfo('EF', 'A', 'PAV', 2)],
    wednesday: [getClassInfo('MAT', 'A', 'JF9', 2)],
    thursday: [getClassInfo('MAT', 'A', 'JF9', 2)],
    friday: [getClassInfo('PT', 'A', 'JF9', 2)] 
  },
  { time: '09:05 - 09:55', monday: 'SPAN', tuesday: 'SPAN', wednesday: 'SPAN', thursday: 'SPAN', friday: 'SPAN' },
  { 
    time: '10:15 - 11:05', 
    monday: [getClassInfo('MAT', 'A', 'JF9')], 
    tuesday: [getClassInfo('HGP', 'A', 'JF9')], 
    wednesday: [getClassInfo('EF', 'A', 'JF36')],
    thursday: [getClassInfo('ET', 'A', 'JF3')],
    friday: [getClassInfo('EF', 'A', 'GIN')] 
  },
  { 
    time: '11:05 - 11:55', 
    monday: [getClassInfo('CN', 'A', 'JF9')],
    tuesday: [getClassInfo('EM', 'A', 'JF9')],
    wednesday: null,
    thursday: [getClassInfo('ING', 'A', 'JF9')],
    friday: [getClassInfo('HGP', 'A', 'JF9')]
  },
  { 
    time: '12:05 - 12:55', 
    monday: [getClassInfo('PT', 'A', 'JF9')],
    tuesday: [
        getClassInfo('CID', '2S', 'JF9'),
        getClassInfo('TIC', '1S', 'JF14')
    ],
    wednesday: [getClassInfo('PT', 'A', 'JF9')],
    thursday: [getClassInfo('HGP', 'A', 'JF9')],
    friday: null
  },
  { 
    time: '12:55 - 13:45', 
    monday: null, 
    tuesday: null, 
    wednesday: null, 
    thursday: null, 
    friday: [getClassInfo('APT', 'A', 'JF9')] 
  },
  { 
    time: '13:55 - 14:45', 
    monday: null, 
    tuesday: [getClassInfo('CN', 'A', 'JF2')], 
    wednesday: [getClassInfo('CN', 'A', 'JF17')], 
    thursday: null, 
    friday: null 
  },
  { 
    time: '14:45 - 15:35', 
    monday: [getClassInfo('EV', 'A', 'JF2')], 
    tuesday: null, 
    wednesday: null, 
    thursday: null, 
    friday: null 
  },
  { 
    time: '15:50 - 16:40', 
    monday: [getClassInfo('DTAL', 'A', 'JF9')], 
    tuesday: null, 
    wednesday: [getClassInfo('AMAT', 'A', 'JF9')], 
    thursday: null, 
    friday: null 
  },
  { time: '16:40 - 17:30', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
  { time: '17:35 - 18:25', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
  { time: '18:30 - 19:20', monday: null, tuesday: null, wednesday: null, thursday: null, friday: null },
];

export const ALL_SUBJECTS = Object.entries(SUBJECT_DETAILS)
  .filter(([key]) => key !== 'DEFAULT')
  .map(([key, { fullName, icon }]) => ({
    key,
    fullName,
    icon,
  }));