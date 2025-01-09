import { createContext } from 'react';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

interface IAllNodesContext {
  data: FileSystemNodeWithSubRows[];
}

export const AllNodesContext = createContext<IAllNodesContext>({ data: [] });
