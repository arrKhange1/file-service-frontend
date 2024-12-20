import { api } from "../base";

interface NodeBase {
    _id: string;
    parentId: string;
    name: string;
    type: string;
}

export type DirectoryNode = NodeBase;

export interface FileNode {
    description: string;
}

export type FileSystemNode = DirectoryNode & FileNode;

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