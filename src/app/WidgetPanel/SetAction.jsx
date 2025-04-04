import { SquareMousePointer } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { Select } from '~/app/Select';
import { Field } from '~/app/WidgetPanel/Field';
import { Properties } from '~/app/WidgetPanel/Property';
import { useWorkbench } from '~/app/Workbench';
import { cx } from '~/app/utils/css';
import * as allWidgets from '~/widgets';

export const SetAction = ({ widget, event, action }) => {
  const id = widget.id;

  const target = useMemo(
    () => (action.properties.target != null ? useWorkbench.getState().widgets.find((widget) => widget.id === action.properties.target) : null),
    [action.properties.target]
  );

  const eventTemplate = allWidgets[widget.type]?.events[event.name];
  const properties = allWidgets[target?.type]?.properties;
  const propertyTemplate = properties?.[action.properties.property];
  const PropertyComponent = Properties[propertyTemplate?.type];

  const getPropertyTypes = () => {
    const types = ['fixed'];
    // TODO Get possible values from the property template (i.e. what it accepts), from the event, from the action output and from the current screen
    switch (propertyTemplate.type) {
      case 'number': {
        types.push('-', 'increment', 'decrement');
        if (!['minimum', 'maximum'].includes(action.properties.property) && 'minimum' in properties && 'maximum' in properties) {
          types.push('random');
        }
        break;
      }
      default:
    }
    if (eventTemplate.type === propertyTemplate.type) {
      types.push('-', 'event');
    }
    return types;
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
    const target = document.querySelector(`[data-id="${action.properties.target}"]`);
    if (target != null) {
      target.dataset.focused = '';
    }
  };

  const handlePointerOut = () => {
    const target = document.querySelector(`[data-id="${action.properties.target}"]`);
    if (target != null) {
      delete target.dataset.focused;
    }
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

  const handleResolve = (value) => {
    if (typeof value === 'symbol') {
      const widget = useWorkbench.getState().widgets.find((widget) => widget.id === action.properties.target);
      return widget.properties[value.description];
    }
    return value;
  };

  return (
    <div className="col-span-2 grid grid-cols-subgrid">
      <Field label="target">
        <div
          className={cx(
            'hover:bg-active relative flex cursor-pointer items-baseline gap-1 rounded-sm px-1 py-0.5',
            target == null && 'text-neutral-700 hover:text-neutral-500'
          )}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}>
          <SquareMousePointer className="h-4 w-4 self-center p-0.5" />
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
              {getPropertyTypes(action).map((name, index) =>
                name === '-' ? (
                  <Select.Separator key={index.toString()} />
                ) : (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                )
              )}
            </Select>
            {action.properties.type === 'fixed' && (
              <div className="flex flex-1">
                <PropertyComponent value={action.properties.value ?? ''} template={propertyTemplate} onChange={handleChangeValue} onResolve={handleResolve} />
              </div>
            )}
          </div>
        </Field>
      )}
    </div>
  );
};
