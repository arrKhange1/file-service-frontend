import * as React from 'react';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

type AddNodePayload = { id: string; nodeToAdd: FileSystemNodeWithSubRows };
type DeleteNodePayload = { id: string };
type PatchNodePayload = { id: string; nodePatch: Partial<FileSystemNodeWithSubRows> };
type SetRootNodesPayload = { rootNodes: FileSystemNodeWithSubRows[] };
type SetSelectedNodePayload = { selectedNode: FileSystemNodeWithSubRows | undefined };
type Action =
  | { type: 'addNode'; payload: AddNodePayload }
  | { type: 'deleteNode'; payload: DeleteNodePayload }
  | { type: 'patchNode'; payload: PatchNodePayload }
  | { type: 'setRootNodes'; payload: SetRootNodesPayload }
  | { type: 'setSelectedNode'; payload: SetSelectedNodePayload };
type Dispatch = (action: Action) => void;
type State = { data: FileSystemNodeWithSubRows[]; selectedNode: FileSystemNodeWithSubRows | undefined };
type FileSystemNodesProviderProps = { rootNodes: FileSystemNodeWithSubRows[]; children: React.ReactNode };

const FileSystemNodesContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

function fileSystemNodesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addNode': {
      function nodeUpdater(
        rows: FileSystemNodeWithSubRows[],
        id: string,
        nodeToAdd: FileSystemNodeWithSubRows,
      ): FileSystemNodeWithSubRows[] {
        if (!rows.length) return [];
        const directoryNode = rows.find((row) => row._id === id);
        const partitionNode = rows.find((row) => row.parentId === id);
        if (directoryNode) {
          const rowWithAddedNode: FileSystemNodeWithSubRows = {
            ...directoryNode,
            subRows: [...(directoryNode.subRows ?? []), nodeToAdd],
          };
          return rows.map((row) => (row._id === id ? rowWithAddedNode : row));
        } else if (partitionNode) return [...rows, nodeToAdd];
        return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows, id, nodeToAdd) } : row));
      }
      const updatedData = nodeUpdater(state.data, action.payload.id, action.payload.nodeToAdd);
      return { ...state, data: updatedData };
    }
    case 'deleteNode': {
      function nodeUpdater(rows: FileSystemNodeWithSubRows[], id: string): FileSystemNodeWithSubRows[] {
        if (!rows.length) return [];
        const searchingRow = rows.find((row) => row._id === id);
        if (searchingRow !== undefined) return rows.filter((row) => row._id !== id);
        return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows, id) } : row));
      }

      const updatedData = nodeUpdater(state.data, action.payload.id);
      return { ...state, data: updatedData };
    }
    case 'patchNode': {
      function nodeUpdater(
        rows: FileSystemNodeWithSubRows[],
        id: string,
        nodePatch: Partial<FileSystemNodeWithSubRows>,
      ): FileSystemNodeWithSubRows[] {
        if (!rows.length) return [];
        const searchingRow = rows.find((row) => row._id === id);
        if (searchingRow !== undefined) return rows.map((row) => (row._id === id ? { ...row, ...nodePatch } : row));
        return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows, id, nodePatch) } : row));
      }

      const updatedData = nodeUpdater(state.data, action.payload.id, action.payload.nodePatch);
      return { ...state, data: updatedData };
    }
    case 'setRootNodes': {
      return { ...state, data: action.payload.rootNodes };
    }
    case 'setSelectedNode': {
      return { ...state, selectedNode: action.payload.selectedNode };
    }
  }
}

const FileSystemNodesProvider: React.FC<FileSystemNodesProviderProps> = ({ rootNodes, children }) => {
  const [state, dispatch] = React.useReducer(fileSystemNodesReducer, { data: rootNodes, selectedNode: undefined });
  const value = { state, dispatch };

  const [previousRootNodes, setPreviousRootNodes] = React.useState(rootNodes);
  if (previousRootNodes !== rootNodes) {
    setPreviousRootNodes(rootNodes);
    dispatch({ type: 'setRootNodes', payload: { rootNodes } });
  }

  return <FileSystemNodesContext.Provider value={value}>{children}</FileSystemNodesContext.Provider>;
};

function useFileSystemNodes() {
  const ctx = React.useContext(FileSystemNodesContext);
  if (ctx === undefined) throw new Error('useFileSystemNodes should be used with FileSystemNodesProvider');
  return ctx;
}

export { FileSystemNodesProvider, useFileSystemNodes };
