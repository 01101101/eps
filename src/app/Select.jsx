import { Check, ChevronDown } from 'lucide-react';
import { Children, cloneElement, useCallback, useMemo, useState } from 'react';
import { useOutsideClick } from '~/app/useOutsideClick';
import { cx } from '~/utils/css';

const Option = ({ onSelect, isVisible, isSelected, children }) => {
  return (
    <div
      onClick={onSelect}
      className={cx('group hover:bg-active relative flex cursor-pointer items-center gap-1 rounded-sm px-1 py-0.5', isSelected && 'bg-active')}>
      {children}
      {isVisible ? <ChevronDown className="h-3 w-3" /> : isSelected && <Check className="h-3 w-3" />}
    </div>
  );
};

const Select = ({ value, onChange, children }) => {
  const [isActive, setIsActive] = useState(false);

  const { element, index } = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const index = childrenArray.findIndex(({ props }) => props.value === value);
    return { index: index !== -1 ? index : 0, element: index !== -1 ? cloneElement(childrenArray[index], { isVisible: true }) : null };
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
    <div className="relative">
      <div onClick={handleToggle}>
        {element ?? <div className="hover:bg-active cursor-pointer rounded-sm px-1 py-0.5 text-neutral-700 hover:text-neutral-500">empty</div>}
      </div>
      {isActive && (
        <div
          ref={ref}
          className="border-border absolute z-10 flex min-w-full -translate-x-[calc(0.25rem-1px)] -translate-y-[calc(0.125rem+1px)] flex-col gap-0.5 rounded-sm border bg-black p-0.5 whitespace-nowrap"
          style={{ top: `calc(${index} * -1.5rem + ${index * 2}px)` }}>
          {Children.map(children, (child) => cloneElement(child, { isSelected: value === child.props.value, onSelect: handleSelect(child.props.value) }))}
        </div>
      )}
    </div>
  );
};

Select.Option = Option;

export { Select };
