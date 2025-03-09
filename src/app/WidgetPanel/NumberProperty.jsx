export const NumberProperty = ({ value, onChange, onResolve, template: { minimum, maximum } }) => {
  const handleChange = (event) => {
    const value = Number(event.target.value);
    if ((minimum == null || value >= onResolve(minimum)) && (maximum == null || value <= onResolve(maximum))) {
      onChange(value);
    }
  };

  return (
    <input
      className="focus:bg-active hover:bg-active w-full appearance-none rounded-sm px-1 py-0.5 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      type="number"
      value={value}
      onChange={handleChange}
    />
  );
};
