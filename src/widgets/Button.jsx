export const Button = ({ label }) => {
  return (
    <div className="flex h-full w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-neutral-700 bg-black px-3 py-2 hover:bg-neutral-800">
      <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{label}</div>
    </div>
  );
};

Button.defaultSize = { width: 9, height: 4 };

Button.properties = {
  label: { type: 'string', default: 'Button' },
};

Button.events = {
  click: {},
};
