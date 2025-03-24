export const Field = ({ label, children }) => {
  return (
    <div className="col-span-2 grid grid-cols-subgrid items-baseline px-1 py-0.5">
      <div className="text-border pr-1 pl-2 text-right text-[10px] uppercase">{label}</div>
      {children}
    </div>
  );
};
