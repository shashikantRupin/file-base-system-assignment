import React from 'react';
import Explorer, { ExplorerItem } from './Explorer';
import './styles.css';

interface FileExplorerProps {
  explorerData: ExplorerItem;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ explorerData }) => {
  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h2>File Explorer</h2>
      </div>
      <div className="explorer-container">
        <Explorer explorer={explorerData} />
      </div>
    </div>
  );
};

export default FileExplorer;