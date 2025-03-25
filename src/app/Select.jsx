import { Check, ChevronDown } from 'lucide-react';
import { Children, cloneElement, useCallback, useMemo, useState } from 'react';
import { useOutsideClick } from '~/app/useOutsideClick';
import { cx } from '~/app/utils/css';

const Option = ({ onSelect, isVisible, isSelected, children }) => {
  return (
    <div
      onClick={onSelect}
      className={cx('group hover:bg-active relative flex cursor-pointer items-center justify-between gap-1 rounded-sm px-1 py-0.5', isSelected && 'bg-active')}>
      {children}
      {isVisible ? <ChevronDown className="h-3 w-3" /> : isSelected && <Check className="h-3 w-3" />}
    </div>
  );
};

const Separator = () => {
  return <div className="bg-border -mx-0.5 h-px w-[calc(100%+0.25rem)]" />;
};

const Select = ({ value, onChange, children, className }) => {
  const [isActive, setIsActive] = useState(false);

  const { top, element, index } = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const index = childrenArray.findIndex(({ props }) => props.value === value);
    const { itemCount, separatorCount } = childrenArray.slice(0, index).reduce(
      ({ itemCount, separatorCount }, item) => {
        const isItem = 'value' in item.props;
        return { itemCount: itemCount + (isItem ? 1 : 0), separatorCount: separatorCount + (isItem ? 0 : 1) };
      },
      { itemCount: 0, separatorCount: 0 }
    );
    const top = `calc(${itemCount} * -1.5rem + ${-separatorCount} * (0.25rem + 1px) + ${index * 2}px)`;
    return { top, element: index === -1 ? null : cloneElement(childrenArray[index], { isVisible: true }) };
  }, [children]);

  const ref = useOutsideClick(useCallback(() => setIsActive(false), []));

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (value) => () => {
    onChange(value);
    setIsActive(false);
  };

  return (
    <div className={cx('relative', className)}>
      <div onClick={handleToggle}>
        {element ?? <div className="hover:bg-active cursor-pointer rounded-sm px-1 py-0.5 text-neutral-700 hover:text-neutral-500">empty</div>}
      </div>
      {isActive && (
        <div
          ref={ref}
          className="border-border absolute z-10 flex min-w-[calc(100%+0.5rem-2px)] -translate-x-[calc(0.25rem-1px)] -translate-y-[calc(0.125rem+1px)] flex-col gap-0.5 rounded-sm border bg-black p-0.5 whitespace-nowrap"
          style={{ top }}>
          {Children.map(children, (child) => cloneElement(child, { isSelected: value === child.props.value, onSelect: handleSelect(child.props.value) }))}
        </div>
      )}
    </div>
  );
};

Select.Option = Option;
Select.Separator = Separator;

export { Select };
