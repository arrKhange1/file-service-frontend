import { Row } from '@tanstack/react-table';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { RowsMutationService } from '../../../shared/lib/rows-mutation.service';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

export async function expandRow(
  row: Row<FileSystemNodeWithSubRows>,
  setRows: React.Dispatch<React.SetStateAction<FileSystemNodeWithSubRows[]>>,
) {
  if (!row.getCanExpand()) return;
  if (!row.original.subRows) {
    const subRows = await FileSystemNodeService.findNodesByParentId({ parentId: row.original._id });
    setRows((prevData) => {
      const updated = RowsMutationService.updateNode(prevData, row.original._id, { subRows });
      return updated;
    });
  }
  row.getToggleExpandedHandler()();
}
