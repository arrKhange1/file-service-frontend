import { FileSystemNodeWithSubRows } from '../api/fs-nodes/fs-nodes.model';

export class RowsMutationService {
  private static mutateNodes(
    oldData: FileSystemNodeWithSubRows[],
    id: string,
    mutateFn: (
      rows: FileSystemNodeWithSubRows[],
      id: string,
      row: FileSystemNodeWithSubRows,
    ) => FileSystemNodeWithSubRows[],
  ): FileSystemNodeWithSubRows[] {
    function nodeUpdater(rows: FileSystemNodeWithSubRows[]): FileSystemNodeWithSubRows[] {
      if (!oldData.length) return [];
      const searchingRow = rows.find((row) => row._id === id);
      if (searchingRow !== undefined) return mutateFn(rows, id, searchingRow);
      return rows.map((row) => (row.subRows ? { ...row, subRows: nodeUpdater(row.subRows) } : row));
    }

    return nodeUpdater(oldData);
  }
  static addNode(
    oldData: FileSystemNodeWithSubRows[],
    id: string,
    nodeAdd: FileSystemNodeWithSubRows,
  ): FileSystemNodeWithSubRows[] {
    const addFn = (rows: FileSystemNodeWithSubRows[], id: string, row: FileSystemNodeWithSubRows) => {
      const rowWithAddedNode: FileSystemNodeWithSubRows = { ...row, subRows: [...(row.subRows ?? []), nodeAdd] };
      return rows.map((row) => (row._id === id ? rowWithAddedNode : row));
    };
    return RowsMutationService.mutateNodes(oldData, id, addFn);
  }

  static deleteNode(oldData: FileSystemNodeWithSubRows[], id: string): FileSystemNodeWithSubRows[] {
    const deleteFn = (rows: FileSystemNodeWithSubRows[]) => rows.filter((row) => row._id !== id);
    return RowsMutationService.mutateNodes(oldData, id, deleteFn);
  }

  static updateNode(
    oldData: FileSystemNodeWithSubRows[],
    id: string,
    nodeUpdate: Partial<FileSystemNodeWithSubRows>,
  ): FileSystemNodeWithSubRows[] {
    const updateFn = (rows: FileSystemNodeWithSubRows[]) =>
      rows.map((row) => (row._id === id ? { ...row, ...nodeUpdate } : row));
    return RowsMutationService.mutateNodes(oldData, id, updateFn);
  }
}
