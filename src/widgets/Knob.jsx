export const Knob = () => {
  return <div>Knob</div>;
};

Knob.defaultSize = { width: 10, height: 4 };

Knob.properties = {
  value: { type: 'number' },
  minimum: { type: 'number' },
  maximum: { type: 'number' },
};

Knob.events = {
  change: {},
};
