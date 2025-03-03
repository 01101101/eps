import { GridBackground } from '~/app/GridBackground';
import { ToolBar } from '~/app/ToolBar';
import { ToolBox } from '~/app/ToolBox';
import { WidgetPanel } from '~/app/WidgetPanel';
import { useWorkbench, Workbench } from '~/app/Workbench';

export const App = () => {
  const isLocked = useWorkbench((state) => state.isLocked);
  const activeWidgetId = useWorkbench((state) => state.activeWidgetId);

  return (
    <div className="relative">
      {!isLocked && <GridBackground />}
      {!isLocked && <ToolBox />}
      <ToolBar />
      <Workbench />
      {activeWidgetId != null && <WidgetPanel />}
    </div>
  );
};
