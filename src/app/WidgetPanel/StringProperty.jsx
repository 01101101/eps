export const StringProperty = ({ value, onChange, template: { pattern, transform } }) => {
  const handleChange = (event) => {
    const transformedValue = transform != null ? transform(event.target.value) : event.target.value;
    if (pattern == null || pattern.test(transformedValue)) {
      onChange(transformedValue);
    }
  };

  return (
    <textarea
      className="focus:bg-active hover:bg-active line-clamp-1 field-sizing-content w-full resize-none rounded-sm px-1 py-0.5 outline-none placeholder:text-neutral-500 focus:line-clamp-none"
      value={value}
      placeholder="empty"
      onChange={handleChange}
    />
  );
};
