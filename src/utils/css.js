export const cx = (...classNames) => {
  return classNames.filter(Boolean).join(' ');
};
