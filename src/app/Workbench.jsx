import { useCallback } from 'react';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';
import { GridSize } from '~/app/GridBackground';
import { ResizeHandle, Widget } from '~/app/Widget';
import * as allWidgets from '~/widgets';

export const useWorkbench = create(
  immer(
    persist(
      () => {
        const activeScreenId = crypto.randomUUID();
        return {
          isLocked: true,
          size: { width: 80, height: 60 },
          widgets: [],
          screens: [{ id: activeScreenId }],
          element: null,
          activeScreenId,
          activeWidgetId: null,
          focusedScreenId: null,
          pointerEvent: null,
          midiInput: null,
          midiOutput: null,
          eventBus: new EventTarget(),
        };
      },
      {
        name: 'eps',
        partialize: (state) =>
          Object.fromEntries(Object.entries(state).filter(([key]) => !['element', 'pointerEvent', 'focusedScreenId', 'eventBus'].includes(key))),
      }
    )
  )
);

export const Workbench = () => {
  const isLocked = useWorkbench((state) => state.isLocked);
  const size = useWorkbench((state) => state.size);
  const widgets = useWorkbench((state) => state.widgets);

  const focusedScreenId = useWorkbench((state) => state.focusedScreenId);

  const handleResize = (size) => {
    useWorkbench.setState((state) => {
      const { minWidth, minHeight } = state.widgets
        .filter((widget) => widget.screenId === state.screens[0].id)
        .reduce(
          ({ minWidth, minHeight }, widget) => {
            const widgetMinWidth = widget.position.x + widget.size.width;
            const widgetMinHeight = widget.position.y + widget.size.height;
            return { minWidth: Math.max(widgetMinWidth, minWidth), minHeight: Math.max(widgetMinHeight, minHeight) };
          },
          { minWidth: 0, minHeight: 0 }
        );
      return {
        size: {
          width: Math.max(size.width, minWidth),
          height: Math.max(size.height, minHeight),
        },
      };
    });
  };

  const handleRef = useCallback((element) => {
    useWorkbench.setState({ element });
  }, []);

  const handleAction = (id) => (event, value) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const events = widget.events.filter(({ name }) => name === event);
      events.forEach(({ action }) => {
        switch (action.name) {
          case 'set': {
            const target = state.widgets.find((widget) => widget.id === action.properties.target);
            switch (action.properties.type) {
              case 'fixed': {
                target.properties[action.properties.property] = action.properties.value;
                break;
              }
              case 'increment': {
                target.properties[action.properties.property] = target.properties[action.properties.property] + 1;
                break;
              }
              case 'decrement': {
                target.properties[action.properties.property] = target.properties[action.properties.property] - 1;
                break;
              }
              case 'random': {
                target.properties[action.properties.property] =
                  Math.floor(Math.random() * (target.properties.maximum - target.properties.minimum + 1)) + target.properties.minimum;
                break;
              }
              case 'event': {
                target.properties[action.properties.property] = value;
                break;
              }
              default:
            }
            break;
          }
          default:
        }
      });
    });
  };

  return (
    <div
      ref={handleRef}
      className="border-border relative flex h-full w-full rounded-sm border"
      style={{ width: `${size.width * GridSize + 1}px`, height: `${size.height * GridSize + 1}px` }}>
      {widgets.map((widget) => {
        const WidgetComponent = allWidgets[widget.type];
        return (
          <Widget key={widget.id} id={widget.id} screenId={widget.screenId} size={widget.size} position={widget.position}>
            <WidgetComponent id={widget.id} size={widget.size} onAction={handleAction(widget.id)} {...widget.properties} />
          </Widget>
        );
      })}
      {!isLocked && focusedScreenId == null && <ResizeHandle size={size} onResize={handleResize} coefficient={2} />}
    </div>
  );
};
