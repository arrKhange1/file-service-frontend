import { Row } from '@tanstack/react-table';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';

export function useExpandRow() {
  const { dispatch } = useFileSystemNodes();

  async function onDirectoryRowClick(row: Row<FileSystemNodeWithSubRows>) {
    if (!row.getCanExpand()) return;
    if (!row.original.subRows) {
      const subRows = await FileSystemNodeService.findNodesByParentId({ parentId: row.original._id });
      dispatch({ type: 'patchNode', payload: { id: row.original._id, nodePatch: { subRows } } });
    }
    row.getToggleExpandedHandler()();
  }

  return { onDirectoryRowClick };
}
