import { api } from '../base';
import { DirectoryNode, FileSystemNode } from './fs-nodes.model';

export interface FindNodesByParentRequestDTO {
  parentId: string;
}

export interface DeleteNodeById {
  id: string;
}

export interface AddDirectory {
  name: string;
  parentId: string;
}

enum FileSystemNodeQueryKey {
  FS_NODES = 'fs-nodes',
}

export class FileSystemNodeService {
  private static fsNodesUrl = 'fs-nodes';

  static queryKeys = FileSystemNodeQueryKey;

  static async findNodesByParentId(params?: FindNodesByParentRequestDTO): Promise<FileSystemNode[]> {
    const response = await api.get(FileSystemNodeService.fsNodesUrl, {
      params,
    });
    return response.data as FileSystemNode[];
  }

  static async deleteNodeById(params: DeleteNodeById): Promise<number> {
    const response = await api.delete(`${FileSystemNodeService.fsNodesUrl}/${params.id}`);
    return response.status;
  }

  static async addDirectory(dirToAdd: AddDirectory): Promise<DirectoryNode> {
    const response = await api.post(`${FileSystemNodeService.fsNodesUrl}/directory`, dirToAdd);
    return response.data as DirectoryNode;
  }
}
