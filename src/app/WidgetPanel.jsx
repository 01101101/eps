import { Zap } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '~/app/Button';
import { useWorkbench } from '~/app/Workbench';
import * as allWidgets from '~/widgets';

const Separator = () => {
  return <div className="bg-border my-1 h-px w-full" />;
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
      className="focus:bg-active hover:bg-active line-clamp-1 field-sizing-content resize-none rounded-sm border border-transparent p-1 outline-none focus:line-clamp-none"
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

export const WidgetPanel = () => {
  const widget = useWorkbench((state) => state.widgets.find(({ id, screenId }) => id === state.activeWidgetId && screenId === state.activeScreenId));
  const widgetProps = useMemo(() => allWidgets[widget?.type], [widget]);

  return (
    widget != null && (
      <div className="border-border absolute -top-px -right-2 flex h-[calc(100%+2px)] w-80 translate-x-full flex-col overflow-y-auto rounded-sm border bg-black">
        <Field id={widget.id} label="id" type="string" value={widget.id} />
        {Object.entries(widgetProps.properties).map(([key, { type }]) => (
          <Field key={key} id={widget.id} label={key} type={type} value={widget.properties?.[key]?.value} />
        ))}
        <Separator />
        {Object.entries(widgetProps.events).map(([key, {}]) => (
          <div key={key} className="px-2 py-1">
            <Button id={widget.id}>
              <Zap className="h-4 w-4" />
              {key}
            </Button>
          </div>
        ))}
      </div>
    )
  );
};
