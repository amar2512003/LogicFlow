import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark">V</div>
        <div><h1>VectorShift</h1><p>Pipeline Studio</p></div>
        <span className="status-pill"><i /> Draft saved</span>
      </header>
      <main>
        <PipelineToolbar />
        <div className="canvas-card"><PipelineUI /><SubmitButton /></div>
      </main>
    </div>
  );
}

export default App;
