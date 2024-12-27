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

export interface DeleteNodeById {
    id: string;
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

    static async deleteNodeById(params: DeleteNodeById): Promise<number>  {
        const response = await api.delete(`${FileSystemNodeService.fsNodesUrl}/${params.id}`);
        return response.status;
    }
}