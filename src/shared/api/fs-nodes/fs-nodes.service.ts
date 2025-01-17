import { api } from '../base';
import { DirectoryNode, FileSystemNode } from './fs-nodes.model';

interface FindNodesByParentRequestDTO {
  parentId: string;
}

interface DeleteNodeById {
  id: string;
}

interface DirectoryMutationRequestDTO {
  name: string;
  parentId?: string;
}

interface FileMutationRequestDTO {
  name: string;
  description?: string;
  parentId?: string;
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

  static async addDirectory(dirToAdd: DirectoryMutationRequestDTO): Promise<DirectoryNode> {
    const response = await api.post(`${FileSystemNodeService.fsNodesUrl}/directory`, dirToAdd);
    return response.data as DirectoryNode;
  }

  static async addFile(fileToAdd: FileMutationRequestDTO): Promise<DirectoryNode> {
    const response = await api.post(`${FileSystemNodeService.fsNodesUrl}/file`, fileToAdd);
    return response.data as DirectoryNode;
  }

  static async patchDirectory(dirId: string, dirPatch: DirectoryMutationRequestDTO) {
    const response = await api.patch(`${FileSystemNodeService.fsNodesUrl}/directory/${dirId}`, dirPatch);
  }

  static async patchFile(fileId: string, filePatch: FileMutationRequestDTO) {
    const response = await api.patch(`${FileSystemNodeService.fsNodesUrl}/file/${fileId}`, filePatch);
  }
}
