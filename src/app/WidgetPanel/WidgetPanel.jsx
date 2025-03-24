import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { Event } from '~/app/WidgetPanel/Event';
import { Property } from '~/app/WidgetPanel/Property';
import { useWorkbench } from '~/app/Workbench';
import { cx } from '~/app/utils/css';
import { stopPropagation } from '~/app/utils/events';
import * as allWidgets from '~/widgets';

const AddEventButton = ({ id, name }) => {
  const handleAddEvent = () => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.events.push({ id: crypto.randomUUID(), name });
    });
  };

  return (
    <div className="border-border hover:bg-active col-span-2 flex cursor-pointer justify-between border-b py-1 pr-1 pl-2" onClick={handleAddEvent}>
      <div className="py-0.5">{name}</div>
      <Plus className="h-5 w-5 p-1" />
    </div>
  );
};

export const WidgetPanel = () => {
  const focusedScreenId = useWorkbench((state) => state.focusedScreenId);

  const widget = useWorkbench((state) => state.widgets.find(({ id, screenId }) => id === state.activeWidgetId && screenId === state.activeScreenId));
  const widgetTemplate = useMemo(() => allWidgets[widget?.type], [widget]);

  const handleResolve = (value) => {
    if (typeof value === 'symbol') {
      return widget.properties[value.description];
    }
    return value;
  };

  return (
    widget != null && (
      <div
        className={cx(
          'border-border absolute -top-px -right-[calc(0.5rem-1px)] grid h-[calc(100%+2px)] w-80 translate-x-full auto-rows-min grid-cols-[min-content_1fr] flex-col overflow-y-auto rounded-sm border bg-black',
          focusedScreenId != null && 'pointer-events-none opacity-30'
        )}
        style={{ scrollbarWidth: 'none' }}
        onPointerDown={stopPropagation}>
        <div className="col-span-2 grid grid-cols-subgrid flex-col py-0.5">
          {Object.entries(widgetTemplate.properties).map(([name, template]) => (
            <Property key={name} id={widget.id} name={name} value={widget.properties[name]} onResolve={handleResolve} template={template} />
          ))}
        </div>
        <div className="bg-border col-span-2 h-px w-full" />
        {widget.events.map((event) => (
          <Event key={event.id} id={widget.id} event={event} />
        ))}
        {Object.entries(widgetTemplate.events).map(([name]) => (
          <AddEventButton key={name} id={widget.id} name={name} />
        ))}
      </div>
    )
  );
};
