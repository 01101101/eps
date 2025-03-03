import { GridBackground } from '~/app/GridBackground';
import { ToolBar } from '~/app/ToolBar';
import { ToolBox } from '~/app/ToolBox';
import { WidgetPanel } from '~/app/WidgetPanel';
import { useWorkbench, Workbench } from '~/app/Workbench';
import { useMidiStore } from '~/app/useMidi';

export const App = () => {
  const isLocked = useWorkbench((state) => state.isLocked);
  const activeWidgetId = useWorkbench((state) => state.activeWidgetId);

  const error = useMidiStore((state) => state.error);

  return (
    <div className="relative">
      {!isLocked && <GridBackground />}
      {!isLocked && <ToolBox />}
      <ToolBar />
      <Workbench />
      {activeWidgetId != null && <WidgetPanel />}
      {error != null && <div className="fixed inset-0 flex items-center justify-center bg-red-500/30 text-3xl font-bold">NO MIDI ACCESS</div>}
    </div>
  );
};
