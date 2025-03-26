export const Label = ({ label, onAction }) => {
  const handleClick = () => {
    onAction('click');
  };

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-neutral-700 bg-black px-3 py-2 hover:bg-neutral-800"
      onClick={handleClick}>
      <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{label}</div>
    </div>
  );
};

Label.defaultSize = { width: 9, height: 4 };

Label.minimumWidth = 4;
Label.minimumHeight = 4;

Label.properties = {
  label: { type: 'string', default: 'Label' },
};

Label.events = {
  click: {},
};
