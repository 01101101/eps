import { property } from '~/app/utils/widgets';

export const Knob = ({ value, minimum, maximum }) => {
  return (
    <div className="relative">
      <svg viewBox="0 0 40 40">
        <circle className="stroke-border fill-black" cx="20" cy="20" r="19" strokeWidth="2" />
        <path
          className="stroke-primary fill-none"
          d="M20 39 a 19 19 0 0 1 0 -38 a 19 19 0 0 1 0 38"
          strokeWidth="2"
          strokeDasharray={`${((value - minimum) / (maximum - minimum)) * 119.3805},119.3805`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] tabular-nums">{value}</div>
    </div>
  );
};

Knob.defaultSize = { width: 4, height: 4 };

Knob.minimumWidth = 4;
Knob.minimumHeight = 4;

Knob.keepAspectRatio = true;

Knob.properties = {
  value: {
    type: 'number',
    minimum: property('minimum'),
    maximum: property('maximum'),
    accepts: {
      decrement: (values) => (values.value - 1 >= values.minimum ? values.value - 1 : values.value),
      increment: (values) => (values.value + 1 <= values.maximum ? values.value + 1 : values.value),
      random: (values) => Math.floor(Math.random() * (values.maximum - values.minimum + 1)) + values.minimum,
    },
    default: 0,
  },
  minimum: { type: 'number', default: 0 },
  maximum: { type: 'number', default: 255 },
};

Knob.events = {
  change: {},
};
