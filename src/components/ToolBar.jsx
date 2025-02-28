import { Lock, Unlock } from 'lucide-react';
import { Button } from './Button';
import { useWorkbench } from './Workbench';

export const ToolBar = () => {
  const isLocked = useWorkbench((state) => state.isLocked);

  const handleToggleLocking = () => {
    useWorkbench.setState({ isLocked: !isLocked, activeWidgetId: null });
  };

  return (
    <div className="absolute right-0 -bottom-2 translate-y-full">
      <Button variant={isLocked ? 'light' : null} onClick={handleToggleLocking}>
        {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        {isLocked ? 'Unlock' : 'Lock'}
      </Button>
    </div>
  );
};
