export const GridSize = 8;

export const GridBackground = () => {
  return (
    <div
      className="absolute z-[-1]"
      style={{
        top: `-${GridSize * 5}px`,
        left: `-${GridSize * 5}px`,
        height: `calc(100% + ${GridSize * 10}px)`,
        width: `calc(100% + ${GridSize * 10}px)`,
        boxShadow: `inset 0 0 ${GridSize * 5}px ${GridSize * 2.5}px #000`,
        backgroundSize: `${GridSize}px ${GridSize}px`,
        backgroundImage:
          'linear-gradient(to right, var(--color-neutral-800) 1px, transparent 1px), linear-gradient(to bottom, var(--color-neutral-800) 1px, transparent 1px)',
      }}
    />
  );
};
