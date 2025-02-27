export const Button = ({ className, variant, onClick, children }) => {
  return (
    <button
      className={`flex cursor-pointer items-center gap-2 rounded-sm border bg-black px-4 py-2 hover:bg-neutral-800 ${className} ${variant === 'light' ? 'border-transparent' : 'border-neutral-700'}`}
      onClick={onClick}>
      {children}
    </button>
  );
};
