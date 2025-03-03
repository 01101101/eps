import { Lock, Unlock } from 'lucide-react';
import { Button } from '~/app/Button';
import { useWorkbench } from '~/app/Workbench';

export const ToolBar = () => {
  const isLocked = useWorkbench((state) => state.isLocked);

  const handleToggleLocking = () => {
    useWorkbench.setState({ isLocked: !isLocked, activeWidgetId: null });
  };

  return (
    <div className="absolute right-0 -bottom-2 left-0 flex translate-y-full justify-between">
      <div className="text-xs">
        <div className="flex gap-2">
          <span className="text-neutral-500">MIDI IN</span>
          <span>EPS</span>
        </div>
        <div className="flex gap-2">
          <span className="text-neutral-500">MIDI OUT</span>
          <span>EPS</span>
        </div>
      </div>
      <Button variant={isLocked ? 'light' : null} onClick={handleToggleLocking}>
        {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        {isLocked ? 'Unlock' : 'Lock'}
      </Button>
    </div>
  );
};
