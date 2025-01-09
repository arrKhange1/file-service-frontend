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
    searchingFn?: (row: FileSystemNodeWithSubRows) => boolean,
  ): FileSystemNodeWithSubRows[] {
    function nodeUpdater(rows: FileSystemNodeWithSubRows[]): FileSystemNodeWithSubRows[] {
      if (!oldData.length) return [];
      const searchingRow = rows.find((row) => (searchingFn ? searchingFn(row) : row._id === id));
      console.log('found row', searchingRow);
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
      if (row._id === id) {
        const rowWithAddedNode: FileSystemNodeWithSubRows = { ...row, subRows: [...(row.subRows ?? []), nodeAdd] };
        return rows.map((row) => (row._id === id ? rowWithAddedNode : row));
      }
      console.log([...rows, nodeAdd]);
      return [...rows, nodeAdd];
    };
    if (!oldData.length) return [nodeAdd];
    return RowsMutationService.mutateNodes(oldData, id, addFn, (row) => row._id === id || row.parentId === id);
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
