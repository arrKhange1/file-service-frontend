import { FileSystemNode } from '../../../shared/api/fs-nodes/fs-nodes.service';

export interface FileSystemNodeWithSubRows extends FileSystemNode {
  subRows?: FileSystemNodeWithSubRows[];
}
