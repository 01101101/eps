import { useMemo } from 'react';
import { useWorkbench } from '~/components/Workbench';
import * as allWidgets from '~/widgets';

const Separator = () => {
  return <hr className="border-border" />;
};

const StringValue = ({ id, property, value }) => {
  const handleChange = (event) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      if (property === 'id') {
        widget.id = event.target.value;
        state.activeWidgetId = widget.id;
      } else {
        if (widget.properties == null) {
          widget.properties = {};
        }
        widget.properties[property].value = event.target.value;
      }
    });
  };

  return (
    <textarea
      className="focus:bg-active hover:bg-active empty:bg-active line-clamp-1 field-sizing-content resize-none rounded-sm border border-transparent p-1 outline-none focus:line-clamp-none"
      value={value}
      onChange={handleChange}
    />
  );
};

const Field = ({ id, label, type, value }) => {
  return (
    <div className="flex flex-col px-2 py-1">
      <div className="text-border p-1 uppercase">{label}</div>
      {type === 'string' ? <StringValue id={id} property={label} value={value} /> : null}
    </div>
  );
};

export const PropertiesBox = () => {
  const widget = useWorkbench((state) => state.widgets.find(({ id }) => id === state.activeWidgetId));
  const properties = useMemo(() => allWidgets[widget.type].properties, [widget]);

  return (
    <div className="border-border absolute -top-px -right-2 flex h-[calc(100%+2px)] w-80 translate-x-full flex-col gap-1 overflow-y-auto rounded-sm border bg-black">
      <Field id={widget.id} label="id" type="string" value={widget.id} />
      <Separator />
      {Object.entries(properties).map(([key, { type }]) => (
        <Field key={key} id={widget.id} label={key} type={type} value={widget.properties?.[key]?.value} />
      ))}
    </div>
  );
};
