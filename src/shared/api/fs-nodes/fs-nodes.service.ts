import { api } from "../base";

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

export interface FindNodesByParentRequestDTO {
    parentId: string;
}

enum FileSystemNodeQueryKey {
    FS_NODES = 'fs-nodes'
}

export class FileSystemNodeService {
    private static fsNodesUrl = 'fs-nodes';

    static queryKeys = FileSystemNodeQueryKey;

    static async findNodesByParentId(params?: FindNodesByParentRequestDTO): Promise<FileSystemNode[]>  {
        const response = await api.get(FileSystemNodeService.fsNodesUrl, {
            params 
        });
        return response.data as FileSystemNode[];
    }
}