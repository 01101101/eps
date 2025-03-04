export const Lcd = ({ value = 'ENSONIQ' }) => {
  return (
    <div
      className="font-lcd text-primary border-border flex h-full w-full rounded-sm border bg-black px-4 py-2 text-xl"
      style={{ textShadow: '0 0 6px var(--color-primary)' }}>
      {value}
    </div>
  );
};

Lcd.defaultSize = { width: 28, height: 5 };

Lcd.properties = {
  value: { type: 'string' },
};

Lcd.events = {};
