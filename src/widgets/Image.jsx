export const Image = ({ label, onAction }) => {
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

Image.defaultSize = { width: 9, height: 4 };

Image.minimumWidth = 4;
Image.minimumHeight = 4;

Image.properties = {
  label: { type: 'string', default: 'Image' },
};

Image.events = {
  click: {},
};
