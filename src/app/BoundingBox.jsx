import { useCallback, experimental_useEffectEvent as useEffectEvent, useRef, useState } from 'react';
import { GridSize } from '~/app/GridBackground';
import { useWorkbench } from '~/app/Workbench';
import { cx } from '~/utils/css';

export const ResizeHandle = ({ className, size, onResize, onResizeStart, onResizeEnd, coefficient = 1 }) => {
  const abortControllerRef = useRef();

  const startRef = useRef(null);

  useEffectEvent(() => {});

  const handlePointerUp = ({ target, pointerId }) => {
    abortControllerRef.current.abort();
    target.releasePointerCapture(pointerId);
    startRef.current = null;
    onResizeEnd?.();
  };

  const handlePointerMove = ({ clientX, clientY }) => {
    const { size, x, y } = startRef.current;
    const deltaX = Math.round((clientX - x) / GridSize) * coefficient;
    const deltaY = Math.round((clientY - y) / GridSize) * coefficient;
    onResize({ width: size.width + deltaX, height: size.height + deltaY });
  };

  const handlePointerDown = ({ target, pointerId, clientX, clientY }) => {
    abortControllerRef.current = new AbortController();
    target.addEventListener('pointerup', handlePointerUp, { signal: abortControllerRef.current.signal });
    target.addEventListener('pointermove', handlePointerMove, { signal: abortControllerRef.current.signal });
    target.setPointerCapture(pointerId);
    startRef.current = { size, x: clientX, y: clientY };
    onResizeStart?.();
  };

  return (
    <div
      className={cx(
        'absolute right-0 bottom-0 h-2 w-2 translate-x-[calc(50%-1px)] translate-y-[calc(50%-1px)] cursor-nwse-resize rounded-xs',
        className ?? 'bg-border'
      )}
      onPointerDown={handlePointerDown}></div>
  );
};

export const BoundingBox = ({ id, size, position, children, className }) => {
  const abortControllerRef = useRef();

  const grabOffsetRef = useRef();

  const workbenchElement = useWorkbench((state) => state.element);
  const isLocked = useWorkbench((state) => state.isLocked);
  const isActive = useWorkbench((state) => state.activeWidgetId === id);

  const [activePosition, setActivePosition] = useState();
  const [isDragging, setIsDragging] = useState();
  const [isResizing, setIsResizing] = useState();

  const currentPosition = activePosition ?? position;

  const handleResize = (size) => {
    useWorkbench.setState((state) => {
      state.widgets.find((widget) => widget.id === id).size = size;
    });
  };

  const handleIsResizing = (isResizing) => () => {
    setIsResizing(isResizing);
  };

  const handleClick = (event) => {
    if (!isLocked) {
      event.stopPropagation();
      useWorkbench.setState({ activeWidgetId: id });
    }
  };

  const computeRelativePosition = (x, y) => {
    const workbenchBounds = workbenchElement.getBoundingClientRect();
    const gridX = Math.round((x - workbenchBounds.x - grabOffsetRef.current.x) / GridSize);
    const gridY = Math.round((y - workbenchBounds.y - grabOffsetRef.current.y) / GridSize);
    const maxX = Math.floor(workbenchBounds.width / GridSize - size.width);
    const maxY = Math.floor(workbenchBounds.height / GridSize - size.height);
    return { x: Math.max(0, Math.min(gridX, maxX)), y: Math.max(0, Math.min(gridY, maxY)) };
  };

  const handlePointerUp = useEffectEvent(({ target, pointerId }) => {
    setIsDragging(false);
    abortControllerRef.current.abort();
    target.style.cursor = 'grab';
    target.releasePointerCapture(pointerId);
    if (activePosition.type === 'relative') {
      useWorkbench.setState((state) => {
        const widget = state.widgets.find((widget) => widget.id === id);
        widget.position = activePosition;
        widget.screenId = state.activeScreenId;
      });
    } else {
      useWorkbench.setState((state) => {
        state.widgets = state.widgets.filter((widget) => widget.id !== id);
        state.activeWidgetId = null;
      });
    }
    setActivePosition(null);
  });

  const handlePointerMove = ({ clientX, clientY }) => {
    const element = document.elementsFromPoint(clientX, clientY).find((element) => element === workbenchElement);
    if (element != null) {
      setActivePosition({ type: 'relative', ...computeRelativePosition(clientX, clientY) });
    } else {
      const workbenchBounds = workbenchElement.getBoundingClientRect();
      setActivePosition({
        type: 'absolute',
        x: clientX - workbenchBounds.x - grabOffsetRef.current.x,
        y: clientY - workbenchBounds.y - grabOffsetRef.current.y,
      });
    }
  };

  const handlePointerDown = ({ target, pointerId, clientX, clientY }) => {
    abortControllerRef.current = new AbortController();
    target.style.cursor = 'grabbing';
    target.addEventListener('pointerup', handlePointerUp, { signal: abortControllerRef.current.signal });
    target.addEventListener('pointermove', handlePointerMove, { signal: abortControllerRef.current.signal });
    target.setPointerCapture(pointerId);
    const element = document.elementsFromPoint(clientX, clientY).find((element) => element === workbenchElement);
    if (element != null) {
      const workbenchBounds = workbenchElement.getBoundingClientRect();
      const widgetLeft = position.x * GridSize + workbenchBounds.x;
      const widgetTop = position.y * GridSize + workbenchBounds.y;
      grabOffsetRef.current = { x: clientX - widgetLeft, y: clientY - widgetTop };
      setActivePosition({ type: 'relative', x: position.x, y: position.y });
    } else {
      const workbenchBounds = workbenchElement.getBoundingClientRect();
      grabOffsetRef.current = { x: (size.width / 2) * GridSize, y: (size.height / 2) * GridSize };
      setActivePosition({
        type: 'absolute',
        x: clientX - workbenchBounds.x - grabOffsetRef.current.x,
        y: clientY - workbenchBounds.y - grabOffsetRef.current.y,
      });
    }
    setIsDragging(true);
  };

  const handleRef = useCallback((element) => {
    const pointerEvent = useWorkbench.getState().pointerEvent;
    if (element != null && pointerEvent != null) {
      useWorkbench.setState({ pointerEvent: null });
      element.dispatchEvent(pointerEvent);
    }
  }, []);

  return (
    <div
      className={cx(
        'absolute top-0 left-0 flex flex-col gap-0.5 rounded-sm border p-[2px]',
        isActive && !isDragging ? 'border-primary' : 'border-transparent',
        activePosition != null && 'pointer-events-none',
        className
      )}
      style={{
        transform: `translate(${currentPosition.type === 'absolute' ? currentPosition.x : currentPosition.x * GridSize - 4}px, ${currentPosition.type === 'absolute' ? currentPosition.y : currentPosition.y * GridSize - 4}px)`,
        width: `${size.width * GridSize + 1 + 4 + 2}px`,
        height: `${size.height * GridSize + 1 + 4 + 2}px`,
      }}
      onClick={handleClick}>
      {children}
      {isDragging && currentPosition.type === 'relative' && (
        <div className="absolute -bottom-0.5 flex w-full translate-y-full justify-center text-[10px]">
          ({currentPosition.x},{currentPosition.y})
        </div>
      )}
      {isResizing && (
        <div className="absolute -bottom-0.5 flex w-full translate-y-full justify-center text-[10px]">
          {size.width} x {size.height}
        </div>
      )}
      {isActive && (
        <>
          <div ref={handleRef} className="absolute top-0 left-0 h-full w-full cursor-grab" onPointerDown={handlePointerDown} />
          {!isDragging && (
            <ResizeHandle
              className="bg-primary"
              size={size}
              onResize={handleResize}
              onResizeStart={handleIsResizing(true)}
              onResizeEnd={handleIsResizing(false)}></ResizeHandle>
          )}
        </>
      )}
    </div>
  );
};
