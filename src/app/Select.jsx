import { Check, ChevronDown } from 'lucide-react';
import { Children, cloneElement, useCallback, useMemo, useState } from 'react';
import { useOutsideClick } from '~/app/useOutsideClick';
import { cx } from '~/utils/css';

const Option = ({ onSelect, isVisible, isSelected, children }) => {
  return (
    <div
      onClick={onSelect}
      className={cx(
        'group relative flex cursor-pointer items-center gap-1 rounded-sm',
        isSelected && 'bg-active',
        isVisible
          ? 'before:bg-active before:absolute before:-top-0.5 before:-left-1 before:z-[-1] before:hidden before:h-[calc(100%+0.25rem)] before:w-[calc(100%+0.5rem)] before:rounded-sm hover:before:block'
          : 'hover:bg-active px-1 py-0.5'
      )}>
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
    return { index: index !== -1 ? index : null, element: index !== -1 ? cloneElement(childrenArray[index], { isVisible: true }) : null };
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
        {element ?? (
          <div className="before:bg-active cursor-pointer text-neutral-700 before:absolute before:-top-0.5 before:-left-1 before:z-[-1] before:hidden before:h-[calc(100%+0.25rem)] before:w-[calc(100%+0.5rem)] before:rounded-sm hover:text-neutral-500 hover:before:block">
            empty
          </div>
        )}
      </div>
      {isActive && (
        <div
          ref={ref}
          className="border-border absolute z-10 flex min-w-full -translate-x-[calc(0.5rem-1px)] -translate-y-[calc(0.375rem-1px)] flex-col gap-0.5 rounded-sm border bg-black p-0.5 whitespace-nowrap"
          style={{ top: `calc(${index ?? 0} * -1.5rem + ${(index ?? 0) !== 0 ? 2 : 0}px)` }}>
          {Children.map(children, (child) => cloneElement(child, { isSelected: value === child.props.value, onSelect: handleSelect(child.props.value) }))}
        </div>
      )}
    </div>
  );
};

Select.Option = Option;

export { Select };
