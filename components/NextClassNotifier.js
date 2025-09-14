import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const NextClassNotifier = ({ nextClass }) => {
  if (!nextClass) {
    return (
      _jsx("div", {
        className: "mb-4 text-center p-3 bg-gray-800/50 rounded-lg",
        children: _jsx("p", {
          className: "text-gray-400",
          children: "N\u00E3o h\u00E1 mais aulas programadas para esta semana."
        })
      })
    );
  }

  const { classInfo, time, day } = nextClass;
  const [startTime] = time.split(' - ');

  return (
    _jsx("div", {
      className: "mb-4 text-center",
      children: _jsxs("div", {
        className: "inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-3 shadow-lg",
        children: [
          _jsx("p", {
            className: "text-sm font-semibold text-gray-400",
            children: "Pr\u00F3xima aula:"
          }),
          _jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              _jsx("span", {
                className: "text-2xl",
                children: classInfo.icon
              }),
              _jsxs("div", {
                children: [
                  _jsx("p", {
                    className: "font-bold text-white",
                    children: classInfo.subjectFullName
                  }),
                  _jsxs("p", {
                    className: "text-xs text-gray-300",
                    children: [
                      day,
                      " \u00E0s ",
                      startTime,
                      " \u2022 ",
                      classInfo.room
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  );
};

export default NextClassNotifier;
