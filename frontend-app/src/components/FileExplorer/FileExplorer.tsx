import React, { useState } from 'react';
import Explorer, { ExplorerItem } from './Explorer';
import './styles.css';

interface FileExplorerProps {
  explorerData: ExplorerItem;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ explorerData }) => {
  const [explorer, setExplorer] = useState(explorerData);

  const handleInsertNode = (folderId: string, item: { name: string; isFolder: boolean }) => {
    const insertNode = (node: ExplorerItem): ExplorerItem => {
      if (node.id === folderId && node.isFolder) {
        const newItem: ExplorerItem = {
          id: Date.now().toString(),
          name: item.name,
          isFolder: item.isFolder,
          items: []
        };
        return { ...node, items: [...node.items, newItem] };
      }

      if (node.isFolder) {
        return {
          ...node,
          items: node.items.map(insertNode)
        };
      }

      return node;
    };

    setExplorer(insertNode(explorer));
  };

  return (
    <div className="file-explorer">
      <div className="explorer-header">
        <h2>File Explorer</h2>
      </div>
      <div className="explorer-container">
        <Explorer 
          explorer={explorer} 
          handleInsertNode={handleInsertNode}
        />
      </div>
    </div>
  );
};

export default FileExplorer;