import { createContext } from 'react';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

interface IAllNodesContext {
  data: FileSystemNodeWithSubRows[];
  onDataChange: (data: FileSystemNodeWithSubRows[]) => void;
  selectedNode: FileSystemNodeWithSubRows | null;
}

export const AllNodesContext = createContext<IAllNodesContext>({
  data: [],
  onDataChange: () => {},
  selectedNode: null,
});
