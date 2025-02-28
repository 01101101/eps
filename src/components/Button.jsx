export const Button = ({ className, variant, onClick, children }) => {
  return (
    <button
      className={`hover:bg-active flex cursor-pointer items-center gap-2 rounded-sm border bg-black px-4 py-2 ${className} ${variant === 'light' ? 'border-transparent' : 'border-border'}`}
      onClick={onClick}>
      {children}
    </button>
  );
};
