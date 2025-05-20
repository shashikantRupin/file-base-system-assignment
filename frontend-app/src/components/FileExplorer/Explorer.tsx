import React, { useState } from 'react';
import { File, FileIcon, Folder } from 'lucide-react';
import './styles.css';

// Define the type for our explorer items
export interface ExplorerItem {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerItem[];
}

interface ExplorerProps {
  explorer: ExplorerItem;
  level?: number;
}

const Explorer: React.FC<ExplorerProps> = ({ explorer, level = 0 }) => {
  const [expanded, setExpanded] = useState(level === 0);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'html':
        return <FileIcon className="file-icon html-icon" />;
      case 'js':
        return <FileIcon className="file-icon js-icon" />;
      case 'css':
        return <FileIcon className="file-icon css-icon" />;
      case 'json':
        return <FileIcon className="file-icon json-icon" />;
      default:
        return <FileIcon className="file-icon" />;
    }
  };

  return (
    <div className="explorer-item" style={{ paddingLeft: `${level * 16}px` }}>
      {explorer.isFolder ? (
        <div className="folder-container">
          <div className="folder-header" onClick={handleToggle}>
            <span className={`folder-icon ${expanded ? 'expanded' : ''}`}>
              <Folder size={18} className="folder-svg" />
            </span>
            <span className="folder-name">{explorer.name}</span>
          </div>
          
          <div className={`folder-content ${expanded ? 'expanded' : ''}`}>
            {expanded && explorer.items.map((item) => (
              <Explorer key={item.id} explorer={item} level={level + 1} />
            ))}
          </div>
        </div>
      ) : (
        <div className="file-container">
          <span className="file-icon-container">
            {getFileIcon(explorer.name)}
          </span>
          <span className="file-name">{explorer.name}</span>
        </div>
      )}
    </div>
  );
};

export default Explorer;