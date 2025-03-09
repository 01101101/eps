import { Plus, SquareMousePointer, X } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { Select } from '~/app/Select';
import { useWorkbench } from '~/app/Workbench';
import { cx } from '~/utils/css';
import { stopPropagation } from '~/utils/events';
import * as allWidgets from '~/widgets';

const Field = ({ label, children, className }) => {
  return (
    <div className="flex flex-col px-1 py-0.5">
      <div className="text-border px-1 text-[10px] uppercase">{label}</div>
      {children}
    </div>
  );
};

const StringProperty = ({ value, onChange, template: { pattern, transform } }) => {
  const patternRegex = useMemo(() => (pattern != null ? new RegExp(pattern) : null), [pattern]);

  const handleChange = (event) => {
    const transformedValue = transform != null ? transform(event.target.value) : event.target.value;
    if (patternRegex == null || patternRegex.test(transformedValue)) {
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

const NumberProperty = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(Number(event.target.value));
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

const Properties = {
  string: StringProperty,
  number: NumberProperty,
};

const Property = ({ id, name, value, template }) => {
  const PropertyComponent = Properties[template.type];

  const handleChange = (value) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.properties[name] = value;
    });
  };

  return (
    <Field label={name}>
      <PropertyComponent value={value} onChange={handleChange} template={template} />
    </Field>
  );
};

const AddEventButton = ({ id, name }) => {
  const handleAddEvent = () => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.events.push({ id: crypto.randomUUID(), name });
    });
  };

  return (
    <div className="border-border hover:bg-active flex cursor-pointer justify-between border-b py-1 pr-1 pl-2" onClick={handleAddEvent}>
      <div className="py-0.5">{name}</div>
      <Plus className="h-5 w-5 p-1" />
    </div>
  );
};

const SetAction = ({ id, event, action }) => {
  const target = useMemo(
    () => (action.properties.target != null ? useWorkbench.getState().widgets.find((widget) => widget.id === action.properties.target) : null),
    [action.properties.target]
  );

  const propertyTemplate = allWidgets[target?.type]?.properties[action.properties.property];
  const PropertyComponent = Properties[propertyTemplate?.type];

  const getTypes = () => {
    const type = allWidgets[target.type].properties[action.properties.property].type;
    switch (type) {
      case 'number':
        return ['fixed', 'increment', 'decrement', 'random'];
      case 'string':
        return ['fixed'];
      default:
        return [];
    }
  };

  const handleFocusWidget = useCallback(({ detail: focusedWidgetId }) => {
    const state = useWorkbench.getState();
    state.eventBus.removeEventListener('focusWidget', handleFocusWidget);
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties = { target: focusedWidgetId };
      state.focusedScreenId = null;
    });
  }, []);

  const handleDocumentClick = useCallback(() => {
    document.removeEventListener('click', handleDocumentClick);
    useWorkbench.getState().eventBus.removeEventListener('focusWidget', handleFocusWidget);
    useWorkbench.setState((state) => {
      state.focusedScreenId = null;
    });
  }, []);

  const handleClick = (event) => {
    event.stopPropagation();
    document.addEventListener('click', handleDocumentClick);
    useWorkbench.getState().eventBus.addEventListener('focusWidget', handleFocusWidget);
    useWorkbench.setState((state) => {
      state.focusedScreenId = state.activeScreenId;
    });
  };

  const handlePointerOver = () => {
    document.querySelector(`[data-id="${action.properties.target}"]`).dataset.focused = '';
  };

  const handlePointerOut = () => {
    delete document.querySelector(`[data-id="${action.properties.target}"]`).dataset.focused;
  };

  const handleChangeProperty = (property) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties.property = property;
      stateEvent.action.properties.type = null;
      stateEvent.action.properties.value = null;
    });
  };

  const handleChangeType = (value) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties.type = value;
      stateEvent.action.properties.value = null;
    });
  };

  const handleChangeValue = (value) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties.value = value;
    });
  };

  return (
    <div className="flex flex-col">
      <Field label="target">
        <div
          className={cx(
            'hover:bg-active relative flex cursor-pointer gap-1 rounded-sm px-1 py-0.5',
            target == null && 'text-neutral-700 hover:text-neutral-500'
          )}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}>
          <SquareMousePointer className="h-4 w-4 p-0.5" />
          {target?.type ?? 'empty'}
        </div>
      </Field>
      {target != null && (
        <Field label="property">
          <Select value={action.properties.property} onChange={handleChangeProperty}>
            {Object.keys(allWidgets[target.type].properties).map((name) => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Field>
      )}
      {action.properties.property != null && (
        <Field label="value">
          <div className="flex">
            <Select value={action.properties.type} onChange={handleChangeType} className={cx(action.properties.type !== 'fixed' && 'flex-1')}>
              {getTypes(action).map((name) => (
                <Select.Option key={name} value={name}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            {action.properties.type === 'fixed' && (
              <div className="flex flex-1">
                <PropertyComponent value={action.properties.value} template={propertyTemplate} onChange={handleChangeValue} />
              </div>
            )}
          </div>
        </Field>
      )}
    </div>
  );
};

const SendAction = ({ action }) => {
  return <></>;
};

const Events = {
  click: {
    set: SetAction,
    send: SendAction,
  },
};

const Event = ({ id, event }) => {
  const Action = Events[event.name][event.action?.name];

  const handleRemoveEvent = () => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.events = widget.events.filter(({ id }) => id !== event.id);
    });
  };

  const handleChangeAction = (name) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action = { name, properties: {} };
    });
  };

  return (
    <div className="border-border flex flex-col border-b">
      <div className="flex items-center justify-between border-b border-dashed border-neutral-800 py-1 pr-1 pl-2">
        <div className="py-0.5">{event.name}</div>
        <X className="hover:bg-active h-5 w-5 cursor-pointer rounded-sm p-1" onClick={handleRemoveEvent} />
      </div>
      <div className="flex flex-col py-0.5">
        <Field label="action">
          <Select value={event.action?.name} onChange={handleChangeAction}>
            {Object.entries(Events[event.name]).map(([action]) => (
              <Select.Option key={action} value={action}>
                {action}
              </Select.Option>
            ))}
          </Select>
        </Field>
        {Action != null && <Action id={id} event={event} action={event.action} />}
      </div>
    </div>
  );
};

export const WidgetPanel = () => {
  const focusedScreenId = useWorkbench((state) => state.focusedScreenId);

  const widget = useWorkbench((state) => state.widgets.find(({ id, screenId }) => id === state.activeWidgetId && screenId === state.activeScreenId));
  const widgetTemplate = useMemo(() => allWidgets[widget?.type], [widget]);

  return (
    widget != null && (
      <div
        className={cx(
          'border-border absolute -top-px -right-[calc(0.5rem-1px)] flex h-[calc(100%+2px)] w-80 translate-x-full flex-col overflow-y-auto rounded-sm border bg-black py-1',
          focusedScreenId != null && 'pointer-events-none opacity-30'
        )}
        style={{ scrollbarWidth: 'none' }}
        onPointerDown={stopPropagation}>
        <div className="flex flex-col py-0.5">
          {Object.entries(widgetTemplate.properties).map(([name, template]) => (
            <Property key={name} id={widget.id} name={name} value={widget.properties[name]} template={template} />
          ))}
        </div>
        <div className="bg-border h-px w-full" />
        {widget.events.map((event) => (
          <Event key={event.id} id={widget.id} event={event} />
        ))}
        {Object.entries(widgetTemplate.events).map(([name]) => (
          <AddEventButton key={name} id={widget.id} name={name} />
        ))}
      </div>
    )
  );
};
