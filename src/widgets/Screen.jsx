export const Screen = () => {
  return <div className="border-border h-full rounded-sm border"></div>;
};

Screen.defaultSize = { width: 10, height: 10 };

Screen.minimumWidth = 5;
Screen.minimumHeight = 5;

Screen.properties = {
  name: { type: 'string' },
};

Screen.events = {
  load: {},
};
