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
    useWorkbench.setState({ size });
  };

  const handleClick = () => {
    if (!isLocked) {
      useWorkbench.setState({ activeWidgetId: null });
    }
  };

  const handleRef = useCallback((element) => {
    useWorkbench.setState({ element });
  }, []);

  return (
    <div
      ref={handleRef}
      className="border-border relative flex h-full w-full rounded-sm border"
      style={{ width: `${size.width * GridSize + 1}px`, height: `${size.height * GridSize + 1}px` }}
      onClick={handleClick}>
      {widgets.map((widget) => (
        <BoundingBox key={widget.id} id={widget.id} size={widget.size} position={widget.position}>
          {allWidgets[widget.type]({ id: widget.id })}
        </BoundingBox>
      ))}
      {!isLocked && <ResizeHandle size={size} onResize={handleResize} coefficient={2} />}
    </div>
  );
};
