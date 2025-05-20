import React from 'react';
import FileExplorer from './components/FileExplorer/FileExplorer';
import explorerData from './data/explorerData';

function App() {
  return (
    <div className="app-container">
      <div className="file-explorer-wrapper">
        <FileExplorer explorerData={explorerData} />
      </div>
    </div>
  );
}

export default App;