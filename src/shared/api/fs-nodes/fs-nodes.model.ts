export interface FileSystemNode {
  _id: string;
  parentId: string;
  name: string;
  type: string;
  subRows: (FileNode | DirectoryNode)[];
}

export type DirectoryNode = FileSystemNode;

export interface FileNode extends FileSystemNode {
  description: string;
}

export type FileSystemNodeWithSubRows = DirectoryNode | FileNode;
