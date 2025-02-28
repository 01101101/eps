export const Button = ({ label = 'Button' }) => {
  return (
    <div className="flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-neutral-700 bg-black px-3 py-2 hover:bg-neutral-800">
      {label}
    </div>
  );
};

Button.defaultSize = { width: 10, height: 4 };
