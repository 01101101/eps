import { Crosshair, List, Plus, X, Zap } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { Select } from '~/app/Select';
import { useWorkbench } from '~/app/Workbench';
import { cx } from '~/utils/css';
import { stopPropagation } from '~/utils/events';
import * as allWidgets from '~/widgets';

const StringProperty = ({ id, name, value, template: { pattern, transform } }) => {
  const patternRegex = useMemo(() => (pattern != null ? new RegExp(pattern) : null), [pattern]);

  const handleChange = (event) => {
    const transformedValue = transform != null ? transform(event.target.value) : event.target.value;
    if (patternRegex == null || patternRegex.test(transformedValue)) {
      useWorkbench.setState((state) => {
        const widget = state.widgets.find((widget) => widget.id === id);
        widget.properties[name] = transformedValue;
      });
    }
  };

  return (
    <textarea
      className="focus:bg-active hover:bg-active line-clamp-1 field-sizing-content resize-none rounded-sm border border-transparent px-1 py-0.5 outline-none placeholder:text-neutral-500 focus:line-clamp-none"
      value={value}
      placeholder="empty"
      onChange={handleChange}
    />
  );
};

const NumberProperty = ({ id, name, value }) => {
  const handleChange = (event) => {
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      widget.properties[name] = Number(event.target.value);
    });
  };

  return (
    <input
      className="focus:bg-active hover:bg-active appearance-none rounded-sm border border-transparent px-1 py-0.5 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
  return (
    <div className="flex flex-col px-2 py-0.5">
      <div className="text-border px-1 uppercase">{name}</div>
      <PropertyComponent id={id} name={name} value={value} template={template} />
    </div>
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
    <div className="border-border hover:bg-active flex cursor-pointer justify-between border-b p-2" onClick={handleAddEvent}>
      <div className="flex items-center gap-1">
        <Zap className="h-4 w-4 p-0.5" />
        {name}
      </div>
      <Plus className="h-4 w-4 p-0.5" />
    </div>
  );
};

const SetAction = ({ id, event, action }) => {
  const target = useMemo(
    () => (action.properties.target != null ? useWorkbench.getState().widgets.find((widget) => widget.id === action.properties.target) : null),
    [action.properties.target]
  );

  const handleFocusWidget = useCallback(({ detail: focusedWidgetId }) => {
    const state = useWorkbench.getState();
    state.eventBus.removeEventListener('focusWidget', handleFocusWidget);
    useWorkbench.setState((state) => {
      const widget = state.widgets.find((widget) => widget.id === id);
      const stateEvent = widget.events.find(({ id }) => id === event.id);
      stateEvent.action.properties.target = focusedWidgetId;
      state.focusedScreenId = null;
    });
  }, []);

  const handleKeyDown = useCallback(({ code }) => {
    if (code === 'Escape') {
      document.removeEventListener('keydown', handleKeyDown);
      useWorkbench.getState().eventBus.removeEventListener('focusWidget', handleFocusWidget);
      useWorkbench.setState((state) => {
        state.focusedScreenId = null;
      });
    }
  }, []);

  const handleClick = () => {
    document.addEventListener('keydown', handleKeyDown);
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
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <Crosshair className="h-4 w-4 p-0.5" />
        <div
          className={cx(
            'before:bg-active relative cursor-pointer before:absolute before:-top-0.5 before:-left-1 before:z-[-1] before:hidden before:h-[calc(100%+0.25rem)] before:w-[calc(100%+0.5rem)] before:rounded-sm hover:before:block',
            target == null && 'text-neutral-700 hover:text-neutral-500'
          )}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}>
          {target?.type ?? 'empty'}
        </div>
      </div>
      {target != null && (
        <div className="relative flex gap-1">
          <List className="h-4 w-4 p-0.5" />
          <Select value={action.properties.property} onChange={handleChangeProperty}>
            {Object.keys(allWidgets[target.type].properties).map((name) => (
              <Select.Option key={name} value={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
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
    <div className="border-border flex flex-col gap-1 border-b p-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 p-0.5" />
          {event.name}{' '}
          <Select value={event.action?.name} onChange={handleChangeAction}>
            {Object.entries(Events[event.name]).map(([action]) => (
              <Select.Option key={action} value={action}>
                {action}
              </Select.Option>
            ))}
          </Select>
        </div>
        <X className="hover:bg-active h-4 w-4 cursor-pointer rounded-sm p-0.5" onClick={handleRemoveEvent} />
      </div>
      {Action != null && <Action id={id} event={event} action={event.action} />}
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
          'border-border absolute -top-px -right-[calc(0.5rem-1px)] flex h-[calc(100%+2px)] w-80 translate-x-full flex-col overflow-y-auto rounded-sm border bg-black py-2',
          focusedScreenId != null && 'pointer-events-none opacity-30'
        )}
        style={{ scrollbarWidth: 'none' }}
        onPointerDown={stopPropagation}>
        {Object.entries(widgetTemplate.properties).map(([name, template]) => (
          <Property key={name} id={widget.id} name={name} value={widget.properties[name]} template={template} />
        ))}
        <div className="bg-border mt-0.5 h-px w-full" />
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
