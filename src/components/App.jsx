import { GridBackground } from './GridBackground';
import { ToolBar } from './ToolBar';
import { ToolBox } from './ToolBox';
import { useWorkbench, Workbench } from './Workbench';

export const App = () => {
  const isLocked = useWorkbench((state) => state.isLocked);

  return (
    <div className="relative">
      {!isLocked && <GridBackground />}
      {!isLocked && <ToolBox />}
      <ToolBar />
      <Workbench />
    </div>
  );
};
