export const Field = ({ label, children }) => {
  return (
    <div className="flex flex-col px-1 py-0.5">
      <div className="text-border px-1 text-[10px] uppercase">{label}</div>
      {children}
    </div>
  );
};
