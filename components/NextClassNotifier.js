import React from 'react';

const NextClassNotifier = ({ nextClass }) => {
  if (!nextClass) {
    return React.createElement("div", { className: "mb-4 text-center p-3 bg-gray-800/50 rounded-lg" },
      React.createElement("p", { className: "text-gray-400" }, "Não há mais aulas programadas para esta semana.")
    );
  }

  const { classInfo, time, day } = nextClass;
  const [startTime] = time.split(' - ');

  return React.createElement("div", { className: "mb-4 text-center" },
    React.createElement("div", { className: "inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-3 shadow-lg" },
      React.createElement("p", { className: "text-sm font-semibold text-gray-400" }, "Próxima aula:"),
      React.createElement("div", { className: "flex items-center gap-3" },
        React.createElement("span", { className: "text-2xl" }, classInfo.icon),
        React.createElement("div", null,
          React.createElement("p", { className: "font-bold text-white" }, classInfo.subjectFullName),
          React.createElement("p", { className: "text-xs text-gray-300" }, `${day} às ${startTime} • ${classInfo.room}`)
        )
      )
    )
  );
};

export default NextClassNotifier;
