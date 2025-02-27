import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BoundingBox } from '~/components/BoundingBox';
import { GridSize } from '~/components/GridBackground';
import { useWorkbench } from '~/components/Workbench';
import * as allWidgets from '~/widgets';

export const ToolBox = () => {
  const abortControllerRef = useRef();

  const grabOffsetRef = useRef();

  const workbenchElement = useWorkbench((state) => state.element);

  const [widget, setWidget] = useState(null);
  const [position, setPosition] = useState();

  const computeRelativePosition = (widget, x, y) => {
    const workbenchBounds = workbenchElement.getBoundingClientRect();
    const gridX = Math.round((x - workbenchBounds.x - grabOffsetRef.current.x) / GridSize);
    const gridY = Math.round((y - workbenchBounds.y - grabOffsetRef.current.y) / GridSize);
    const maxX = Math.floor(workbenchBounds.width / GridSize - widget.defaultSize.width);
    const maxY = Math.floor(workbenchBounds.height / GridSize - widget.defaultSize.height);
    return { x: Math.max(0, Math.min(gridX, maxX)), y: Math.max(0, Math.min(gridY, maxY)) };
  };

  const handlePointerUp =
    (widget) =>
    ({ clientX, clientY, target, pointerId }) => {
      abortControllerRef.current.abort();
      target.style.cursor = 'grab';
      target.releasePointerCapture(pointerId);
      const element = document.elementFromPoint(clientX, clientY);
      if (element === workbenchElement) {
        useWorkbench.setState((state) => {
          state.widgets.push({
            id: crypto.randomUUID(),
            type: widget.name,
            position: computeRelativePosition(widget, clientX, clientY),
            size: widget.defaultSize,
          });
        });
      }
      setWidget(null);
    };

  const handlePointerMove =
    (widget) =>
    ({ clientX, clientY }) => {
      const element = document.elementFromPoint(clientX, clientY);
      if (element === workbenchElement) {
        setPosition({ type: 'relative', ...computeRelativePosition(widget, clientX, clientY) });
      } else {
        setPosition({ type: 'absolute', x: clientX - (widget.defaultSize.width / 2) * GridSize, y: clientY - (widget.defaultSize.height / 2) * GridSize });
      }
    };

  const handlePointerDown =
    (type) =>
    ({ target, pointerId, clientX, clientY }) => {
      const widget = allWidgets[type];
      abortControllerRef.current = new AbortController();
      target.style.cursor = 'grabbing';
      target.addEventListener('pointerup', handlePointerUp(widget), { signal: abortControllerRef.current.signal });
      target.addEventListener('pointermove', handlePointerMove(widget), { signal: abortControllerRef.current.signal });
      target.setPointerCapture(pointerId);
      grabOffsetRef.current = { x: (widget.defaultSize.width / 2) * GridSize, y: (widget.defaultSize.height / 2) * GridSize };
      setPosition({ type: 'absolute', x: clientX - grabOffsetRef.current.x, y: clientY - grabOffsetRef.current.y });
      setWidget(() => widget);
    };

  return (
    <div
      className="absolute -top-px -left-2 flex h-[calc(100%+2px)] w-44 -translate-x-full flex-col gap-[5px] overflow-y-auto rounded-sm border border-neutral-700 bg-black p-[10px]"
      style={{ scrollbarWidth: 'none' }}>
      {Object.keys(allWidgets)
        .filter((type) => !type.endsWith('Size'))
        .map((type) => (
          <div key={type} className="cursor-grab rounded-sm px-2 py-1 hover:bg-neutral-800" onPointerDown={handlePointerDown(type)}>
            {type}
          </div>
        ))}
      {widget != null &&
        createPortal(
          <BoundingBox className="pointer-events-none" size={widget.defaultSize} position={position}>
            {widget({})}
            {position.type === 'relative' && (
              <div className="flex w-full justify-center text-[10px]">
                {position.x} x {position.y}
              </div>
            )}
          </BoundingBox>,
          position.type === 'absolute' ? document.body : workbenchElement
        )}
    </div>
  );
};
