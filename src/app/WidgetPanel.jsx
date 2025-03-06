import { Plus, Zap } from 'lucide-react';
import { useMemo } from 'react';
import { useWorkbench } from '~/app/Workbench';
import { stopPropagation } from '~/utils/events';
import * as allWidgets from '~/widgets';

const StringValue = ({ id, property, value }) => {
  const handleChange = (event) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.properties[property] = event.target.value;
    });
  };

  return (
    <textarea
      className="focus:bg-active hover:bg-active line-clamp-1 field-sizing-content resize-none rounded-sm border border-transparent px-1 py-0.5 outline-none focus:line-clamp-none"
      value={value}
      onChange={handleChange}
    />
  );
};

const NumberValue = ({ id, property, value }) => {
  const handleChange = (event) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      console.log(typeof event.target.value);
      widget.properties[property] = Number(event.target.value);
    });
  };

  return (
    <input
      className="focus:bg-active hover:bg-active appearance-none rounded-sm border border-transparent px-1 py-0.5 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
};

const Field = ({ id, label, type, value }) => {
  return (
    <div className="flex flex-col px-2 py-0.5">
      <div className="text-border px-1 uppercase">{label}</div>
      {type === 'string' ? (
        <StringValue id={id} property={label} value={value} />
      ) : type === 'number' ? (
        <NumberValue id={id} property={label} value={value} />
      ) : null}
    </div>
  );
};

const Event = ({ name }) => {
  return (
    <div className="border-border hover:bg-active flex cursor-pointer justify-between border-b p-2">
      <div className="flex items-center gap-1">
        <Zap className="h-4 w-4" />
        {name}
      </div>
      <Plus className="h-4 w-4" />
    </div>
  );
};

export const WidgetPanel = () => {
  const widget = useWorkbench((state) => state.widgets.find(({ id, screenId }) => id === state.activeWidgetId && screenId === state.activeScreenId));
  const widgetTemplate = useMemo(() => allWidgets[widget?.type], [widget]);

  return (
    widget != null && (
      <div
        className="border-border absolute -top-px -right-2 flex h-[calc(100%+2px)] w-80 translate-x-full flex-col overflow-y-auto rounded-sm border bg-black py-2"
        style={{ scrollbarWidth: 'none' }}
        onPointerDown={stopPropagation}>
        {Object.entries(widgetTemplate.properties).map(([key, { type }]) => (
          <Field key={key} id={widget.id} label={key} type={type} value={widget.properties[key]} />
        ))}
        <div className="bg-border mt-0.5 h-px w-full" />
        {Object.entries(widgetTemplate.events).map(([name, {}]) => (
          <Event key={name} name={name} />
        ))}
      </div>
    )
  );
};
