export const Slider = () => {
  return <div>Slider</div>;
};

Slider.defaultSize = { width: 10, height: 4 };

Slider.properties = {
  value: { type: 'number' },
  minimum: { type: 'number' },
  maximum: { type: 'number' },
};

Slider.events = {
  change: {},
};
