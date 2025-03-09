import { GridBackground } from '~/app/GridBackground';
import { ToolBar } from '~/app/ToolBar';
import { ToolBox } from '~/app/ToolBox';
import { WidgetPanel } from '~/app/WidgetPanel/WidgetPanel';
import { useWorkbench, Workbench } from '~/app/Workbench';
import { useMidi } from '~/app/useMidi';

export const App = () => {
  const error = useMidi();

  const isLocked = useWorkbench((state) => state.isLocked);
  const activeWidgetId = useWorkbench((state) => state.activeWidgetId);

  return error === null ? (
    <div className="relative">
      {!isLocked && <GridBackground />}
      {!isLocked && <ToolBox />}
      {activeWidgetId != null && <WidgetPanel />}
      <Workbench />
      <ToolBar />
    </div>
  ) : (
    error !== undefined && <div className="fixed inset-0 flex items-center justify-center bg-red-500/20 text-3xl font-bold">NO MIDI ACCESS</div>
  );
};
