import { useCallback, experimental_useEffectEvent as useEffectEvent, useRef, useState } from 'react';
import { GridSize } from '~/app/GridBackground';
import { useOutsideClick } from '~/app/useOutsideClick';
import { cx } from '~/app/utils/css';
import { useWorkbench } from '~/app/Workbench';
import * as allWidgets from '~/widgets';

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

  const handlePointerDown = (event) => {
    event.stopPropagation();
    const { target, pointerId, clientX, clientY } = event;
    abortControllerRef.current = new AbortController();
    target.addEventListener('pointerup', handlePointerUp, { signal: abortControllerRef.current.signal });
    target.addEventListener('pointermove', handlePointerMove, { signal: abortControllerRef.current.signal });
    target.setPointerCapture(pointerId);
    startRef.current = { size, x: clientX, y: clientY };
    onResizeStart?.();
  };

  return (
    <div
      className={cx('absolute right-0 bottom-0 h-2 w-2 translate-x-1/2 translate-y-1/2 cursor-nwse-resize rounded-xs', className ?? 'bg-border')}
      onPointerDown={handlePointerDown}></div>
  );
};

export const Widget = ({ id, screenId, size, position, children, className }) => {
  const abortControllerRef = useRef();

  const grabOffsetRef = useRef();

  const workbenchElement = useWorkbench((state) => state.element);
  const isLocked = useWorkbench((state) => state.isLocked);
  const isActive = useWorkbench((state) => state.activeWidgetId === id);
  const focusedScreenId = useWorkbench((state) => state.focusedScreenId);

  const [activePosition, setActivePosition] = useState();
  const [isDragging, setIsDragging] = useState();
  const [isResizing, setIsResizing] = useState();

  const currentPosition = activePosition ?? position;

  const ref = useOutsideClick(
    useCallback(() => {
      const state = useWorkbench.getState();
      if (!state.isLocked && state.focusedScreenId == null) {
        useWorkbench.setState({ activeWidgetId: null });
      }
    }, [])
  );

  const handleResize = (size) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const { defaultSize, keepAspectRatio, minimumWidth, minimumHeight, maximumWidth, maximumHeight } = allWidgets[widget.type];
      const aspectRatio = defaultSize.width / defaultSize.height;
      const width = Math.min(Math.min(Math.max(size.width, minimumWidth), maximumWidth ?? Infinity), state.size.width - position.x);
      const height = Math.min(
        Math.min(Math.max(keepAspectRatio ? width / aspectRatio : size.height, minimumHeight), maximumHeight ?? Infinity),
        state.size.height - position.y
      );
      widget.size = { width: keepAspectRatio ? height * aspectRatio : width, height };
    });
  };

  const handleIsResizing = (isResizing) => () => {
    setIsResizing(isResizing);
  };

  const handleClick = () => {
    if (focusedScreenId == null) {
      useWorkbench.setState({ activeWidgetId: id });
    } else {
      useWorkbench.getState().eventBus.dispatchEvent(new CustomEvent('focusWidget', { detail: id }));
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
        state.widgets.forEach((widget) => {
          widget.events = widget.events.filter((event) => event.action?.name !== 'set' || event.action.properties.target !== id);
        });
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

  const handlePointerDown = (event) => {
    event.stopPropagation();
    const { target, pointerId, clientX, clientY } = event;
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
      ref={ref}
      className={cx(
        'group absolute top-0 left-0 flex flex-col justify-center gap-0.5 rounded-sm border p-[2px]',
        isActive ? 'border-primary' : 'border-transparent',
        activePosition != null && 'pointer-events-none',
        className
      )}
      style={{
        transform: `translate(${currentPosition.type === 'absolute' ? currentPosition.x : currentPosition.x * GridSize - 4}px, ${currentPosition.type === 'absolute' ? currentPosition.y : currentPosition.y * GridSize - 4}px)`,
        width: `${size.width * GridSize + 1 + 4 + 2}px`,
        height: `${size.height * GridSize + 1 + 4 + 2}px`,
      }}
      data-id={id}
      data-screen-id={screenId}>
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
      {isActive && focusedScreenId == null ? (
        <>
          <div ref={handleRef} className="absolute top-0 left-0 h-full w-full cursor-grab" onPointerDown={handlePointerDown} />
          <ResizeHandle
            className="bg-primary"
            size={size}
            onResize={handleResize}
            onResizeStart={handleIsResizing(true)}
            onResizeEnd={handleIsResizing(false)}
          />
        </>
      ) : (
        !isLocked && (
          <div
            className={cx(
              'absolute -top-px -left-px h-[calc(100%+2px)] w-[calc(100%+2px)] cursor-pointer rounded-sm border border-transparent',
              focusedScreenId != null ? 'hover:bg-primary/30' : 'hover:border-primary group-data-[focused]:bg-primary/30'
            )}
            onClick={handleClick}
          />
        )
      )}
    </div>
  );
};
