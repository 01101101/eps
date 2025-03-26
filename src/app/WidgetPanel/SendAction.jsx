import commands from '~/../protocol/data/commands';
import { Select } from '~/app/Select';
import { Field } from '~/app/WidgetPanel/Field';
import { useWorkbench } from '~/app/Workbench';

export const SendAction = ({ widget, event, action }) => {
  const id = widget.id;

  const handleChangeCommand = (command) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties.command = command;
    });
  };

  return (
    <div className="col-span-2 grid grid-cols-subgrid">
      <Field label="command">
        <Select value={action.properties.command} onChange={handleChangeCommand}>
          {Object.entries(commands).map(([code, { name }]) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Field>
    </div>
  );
};
