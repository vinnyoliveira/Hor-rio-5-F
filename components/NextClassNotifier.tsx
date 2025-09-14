import React from 'react';
import type { ClassInfo } from '../types';

interface NextClassNotifierProps {
  nextClass: { classInfo: ClassInfo; time: string; day: string } | null;
}

const NextClassNotifier: React.FC<NextClassNotifierProps> = ({ nextClass }) => {
  if (!nextClass) {
    return (
      <div className="mb-4 text-center p-3 bg-gray-800/50 rounded-lg">
        <p className="text-gray-400">Não há mais aulas programadas para esta semana.</p>
      </div>
    );
  }

  const { classInfo, time, day } = nextClass;
  const [startTime] = time.split(' - ');

  return (
    <div className="mb-4 text-center">
      <div className="inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-gray-400">Próxima aula:</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{classInfo.icon}</span>
          <div>
            <p className="font-bold text-white">{classInfo.subjectFullName}</p>
            <p className="text-xs text-gray-300">{day} às {startTime} • {classInfo.room}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextClassNotifier;
