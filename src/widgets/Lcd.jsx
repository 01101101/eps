export const Lcd = ({ value }) => {
  return (
    <div
      className="font-lcd text-primary border-border flex h-full w-full rounded-sm border bg-black px-4 py-2 text-xl"
      style={{ textShadow: '0 0 6px var(--color-primary)' }}>
      <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{value}</div>
    </div>
  );
};

Lcd.defaultSize = { width: 15, height: 5 };

Lcd.minimumWidth = 6;
Lcd.minimumHeight = 5;

Lcd.maximumHeight = 5;

Lcd.properties = {
  value: { type: 'string', pattern: /^[A-Z0-9%&'<>*+,\-\/=?@\[\\\]_{|} ]*$/, transform: (value) => value.toUpperCase(), default: 'LCD' },
};

Lcd.events = {};
