import React, { useState } from 'react';
import { File, FileIcon, Folder, FolderPlus, FilePlus } from 'lucide-react';
import './styles.css';

export interface ExplorerItem {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerItem[];
}

interface ExplorerProps {
  explorer: ExplorerItem;
  level?: number;
  handleInsertNode: (folderId: string, item: { name: string; isFolder: boolean }) => void;
}

const Explorer: React.FC<ExplorerProps> = ({ explorer, level = 0, handleInsertNode }) => {
  const [expanded, setExpanded] = useState(level === 0);
  const [showInput, setShowInput] = useState({ visible: false, isFolder: false });

  const handleNewItem = (e: React.MouseEvent, isFolder: boolean) => {
    e.stopPropagation();
    setExpanded(true);
    setShowInput({ visible: true, isFolder });
  };

  const onAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      handleInsertNode(explorer.id, {
        name: e.currentTarget.value,
        isFolder: showInput.isFolder,
      });
      setShowInput({ visible: false, isFolder: false });
    }
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
          <div className="folder-header" onClick={() => setExpanded(!expanded)}>
            <span className={`folder-icon ${expanded ? 'expanded' : ''}`}>
              <Folder size={18} className="folder-svg" />
            </span>
            <span className="folder-name">{explorer.name}</span>
            <div className="folder-actions">
              <button onClick={(e) => handleNewItem(e, true)} className="action-button">
                <FolderPlus size={16} />
              </button>
              <button onClick={(e) => handleNewItem(e, false)} className="action-button">
                <FilePlus size={16} />
              </button>
            </div>
          </div>
          
          <div className={`folder-content ${expanded ? 'expanded' : ''}`}>
            {showInput.visible && (
              <div className="input-container" style={{ paddingLeft: `${(level + 1) * 16}px` }}>
                <span className="input-icon">
                  {showInput.isFolder ? <Folder size={16} /> : <File size={16} />}
                </span>
                <input
                  type="text"
                  className="item-input"
                  autoFocus
                  onBlur={() => setShowInput({ visible: false, isFolder: false })}
                  onKeyDown={onAddItem}
                  placeholder={showInput.isFolder ? 'Folder name...' : 'File name...'}
                />
              </div>
            )}
            {expanded && explorer.items.map((item) => (
              <Explorer 
                key={item.id} 
                explorer={item} 
                level={level + 1}
                handleInsertNode={handleInsertNode}
              />
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