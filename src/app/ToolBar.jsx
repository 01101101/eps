import { Lock, Unlock } from 'lucide-react';
import { Button } from '~/app/Button';
import { Select } from '~/app/Select';
import { useWorkbench } from '~/app/Workbench';
import { useMidiStore } from '~/app/useMidi';

export const ToolBar = () => {
  const isLocked = useWorkbench((state) => state.isLocked);

  const inputs = useMidiStore((state) => state.inputs);
  const outputs = useMidiStore((state) => state.outputs);

  const input = useWorkbench((state) => state.midiInput);
  const output = useWorkbench((state) => state.midiOutput);

  const handleChangeInput = (id) => {
    useWorkbench.setState({ midiInput: id });
  };

  const handleChangeOutput = (id) => {
    useWorkbench.setState({ midiOutput: id });
  };

  const handleToggleLocking = () => {
    useWorkbench.setState({ isLocked: !isLocked, activeWidgetId: null });
  };

  return (
    <div className="absolute right-0 -bottom-2 left-0 flex translate-y-full justify-between">
      {isLocked ? (
        <div className="text-xs">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">MIDI In</span>
            <Select value={input} onChange={handleChangeInput}>
              {inputs.map((input) => (
                <Select.Option key={input.id} value={input.id}>
                  {input.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">MIDI Out</span>
            <Select value={output} onChange={handleChangeOutput}>
              {outputs.map((output) => (
                <Select.Option key={output.id} value={output.id}>
                  {output.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      ) : (
        <div />
      )}
      <Button variant={isLocked ? 'light' : null} onClick={handleToggleLocking}>
        {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        {isLocked ? 'Unlock' : 'Lock'}
      </Button>
    </div>
  );
};
