export interface FileSystemNode {
  _id: string;
  parentId: string;
  name: string;
  type: string;
}

export type DirectoryNode = FileSystemNode;

export interface FileNode extends FileSystemNode {
  description: string;
}

export interface FileSystemNodeWithSubRows extends FileSystemNode {
  subRows?: FileSystemNodeWithSubRows[];
}
