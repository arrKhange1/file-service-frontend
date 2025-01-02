import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { expandRow } from '../../../features/expand-row/lib/expand-row';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

interface AllNodeTableProps {
  rootData: FileSystemNodeWithSubRows[];
}

export const AllNodesTable: React.FC<AllNodeTableProps> = ({ rootData }) => {
  return (
    <FileSystemNodeTable
      rootData={rootData}
      renderCustomDirectoryRow={(row, children, setRows) => <tr onClick={() => expandRow(row, setRows)}>{children}</tr>}
    />
  );
};
