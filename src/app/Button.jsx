import { cx } from '~/app/utils/css';

export const Button = ({ className, variant, onClick, children }) => {
  return (
    <button
      className={cx(
        'hover:bg-active flex cursor-pointer items-center gap-2 rounded-sm border bg-black px-4 py-2',
        variant === 'light' ? 'border-transparent' : 'border-border',
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};
