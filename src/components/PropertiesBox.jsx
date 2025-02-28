import { useMemo } from 'react';
import { useWorkbench } from '~/components/Workbench';
import * as allWidgets from '~/widgets';

const Separator = () => {
  return <hr className="border-border" />;
};

const Field = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1 p-2">
      <div className="text-border uppercase">{label}</div>
      <div>{value}</div>
    </div>
  );
};

export const PropertiesBox = () => {
  const widget = useWorkbench((state) => state.widgets.find(({ id }) => id === state.activeWidgetId));
  const properties = useMemo(() => allWidgets[widget.type].properties, [widget]);

  console.log(properties);

  return (
    <div className="border-border absolute -top-px -right-2 flex h-[calc(100%+2px)] w-80 translate-x-full flex-col gap-1 overflow-y-auto rounded-sm border bg-black">
      <Field label="id" value={widget.id} />
      <Separator />
      {Object.keys(properties).map((key) => (
        <Field label={key} value={''} />
      ))}
    </div>
  );
};
