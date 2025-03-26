import { useEffect } from 'react';
import { property } from '~/app/utils/widgets';
import { useWorkbench } from '~/app/Workbench';

export const Knob = ({ id, value, minimum, maximum, onAction }) => {
  const handleWheel = ({ deltaY }) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.properties.value = Math.min(Math.max(value + (deltaY > 0 ? 1 : -1), minimum), maximum);
    });
  };

  useEffect(() => {
    if (value < minimum || value > maximum) {
      useWorkbench.setState((state) => {
        const widget = state.widgets.find((widget) => widget.id === id);
        widget.properties.value = Math.min(Math.max(value, minimum), maximum);
      });
    } else {
      onAction('change', value);
    }
  }, [value]);

  return (
    <div className="relative" onWheel={handleWheel}>
      <svg viewBox="0 0 40 40">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle className="stroke-border fill-black" cx="20" cy="20" r="19" strokeWidth="2" />
        <path
          filter="url(#glow)"
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
  value: { type: 'number', minimum: property('minimum'), maximum: property('maximum'), default: 0 },
  minimum: { type: 'number', maximum: property('value'), default: 0 },
  maximum: { type: 'number', minimum: property('value'), default: 255 },
};

Knob.events = {
  change: { type: 'number' },
};
