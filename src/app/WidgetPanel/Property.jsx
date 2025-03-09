import { Field } from '~/app/WidgetPanel/Field';
import { NumberProperty } from '~/app/WidgetPanel/NumberProperty';
import { StringProperty } from '~/app/WidgetPanel/StringProperty';
import { useWorkbench } from '~/app/Workbench';

export const Properties = {
  string: StringProperty,
  number: NumberProperty,
};

export const Property = ({ id, name, value, template, onResolve }) => {
  const PropertyComponent = Properties[template.type];

  const handleChange = (value) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.properties[name] = value;
    });
  };

  return (
    <Field label={name}>
      <PropertyComponent value={value} onChange={handleChange} onResolve={onResolve} template={template} />
    </Field>
  );
};
