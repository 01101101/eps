import { useWorkbench } from '~/app/Workbench';
import * as allWidgets from '~/widgets';

export const ToolBox = () => {
  const handlePointerDown = (type) => (event) => {
    event.stopPropagation();
    const { target, pointerId, clientX, clientY } = event;
    const widget = allWidgets[type];
    useWorkbench.setState((state) => {
      const id = crypto.randomUUID();
      state.pointerEvent = new PointerEvent('pointerdown', { bubbles: true, target, pointerId, clientX, clientY });
      state.widgets.push({
        id,
        type,
        position: { type: 'absolute', x: 0, y: 0 },
        size: widget.defaultSize,
        properties: Object.fromEntries(Object.entries(widget.properties).map(([name, property]) => [name, property.default])),
      });
      state.activeWidgetId = id;
    });
  };

  return (
    <div
      className="border-border absolute -top-px -left-2 flex h-[calc(100%+2px)] w-44 -translate-x-full flex-col gap-1 overflow-y-auto rounded-sm border bg-black p-2"
      style={{ scrollbarWidth: 'none' }}>
      {Object.keys(allWidgets)
        .filter((type) => !type.endsWith('Size'))
        .map((type) => (
          <div key={type} className="hover:bg-active cursor-grab rounded-sm px-2 py-1" onPointerDown={handlePointerDown(type)}>
            {type}
          </div>
        ))}
    </div>
  );
};
