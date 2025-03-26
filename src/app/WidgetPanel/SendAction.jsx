import commands from '~/../protocol/data/commands';
import { Select } from '~/app/Select';
import { Field } from '~/app/WidgetPanel/Field';

export const SendAction = ({ action }) => {
  const handleChangeCommand = () => {};

  return (
    <div className="col-span-2 grid grid-cols-subgrid">
      <Field label="command">
        <Select value={action.properties.property} onChange={handleChangeCommand}>
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
