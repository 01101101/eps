export const Switch = () => {
  return <div>Switch</div>;
};

Switch.defaultSize = { width: 10, height: 4 };

Switch.properties = {
  value: { type: 'boolean' },
};

Switch.events = {
  change: {},
};
