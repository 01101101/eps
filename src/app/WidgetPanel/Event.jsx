import { X } from 'lucide-react';
import { Select } from '~/app/Select';
import { Field } from '~/app/WidgetPanel/Field';
import { SendAction } from '~/app/WidgetPanel/SendAction';
import { SetAction } from '~/app/WidgetPanel/SetAction';
import { useWorkbench } from '~/app/Workbench';

export const Events = {
  click: {
    set: SetAction,
    send: SendAction,
  },
};

export const Event = ({ id, event }) => {
  const Action = Events[event.name][event.action?.name];

  const handleRemoveEvent = () => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.events = widget.events.filter(({ id }) => id !== event.id);
    });
  };

  const handleChangeAction = (name) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action = { name, properties: {} };
    });
  };

  return (
    <div className="border-border flex flex-col border-b">
      <div className="flex items-center justify-between border-b border-dashed border-neutral-800 py-1 pr-1 pl-2">
        <div className="py-0.5">{event.name}</div>
        <X className="hover:bg-active h-5 w-5 cursor-pointer rounded-sm p-1" onClick={handleRemoveEvent} />
      </div>
      <div className="flex flex-col py-0.5">
        <Field label="action">
          <Select value={event.action?.name} onChange={handleChangeAction}>
            {Object.entries(Events[event.name]).map(([action]) => (
              <Select.Option key={action} value={action}>
                {action}
              </Select.Option>
            ))}
          </Select>
        </Field>
        {Action != null && <Action id={id} event={event} action={event.action} />}
      </div>
    </div>
  );
};
