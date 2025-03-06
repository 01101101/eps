import { useCallback } from 'react';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';
import { BoundingBox, ResizeHandle } from '~/app/BoundingBox';
import { GridSize } from '~/app/GridBackground';
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
          pointerEvent: null,
          midiInput: null,
          midiOutput: null,
        };
      },
      {
        name: 'eps',
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => !['element', 'pointerEvent'].includes(key))),
      }
    )
  )
);

export const Workbench = () => {
  const isLocked = useWorkbench((state) => state.isLocked);
  const size = useWorkbench((state) => state.size);
  const widgets = useWorkbench((state) => state.widgets);

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

  return (
    <div
      ref={handleRef}
      className="border-border relative flex h-full w-full rounded-sm border"
      style={{ width: `${size.width * GridSize + 1}px`, height: `${size.height * GridSize + 1}px` }}>
      {widgets.map((widget) => {
        const Widget = allWidgets[widget.type];
        return (
          <BoundingBox key={widget.id} id={widget.id} size={widget.size} position={widget.position}>
            <Widget id={widget.id} size={widget.size} {...widget.properties} />
          </BoundingBox>
        );
      })}
      {!isLocked && <ResizeHandle size={size} onResize={handleResize} coefficient={2} />}
    </div>
  );
};
