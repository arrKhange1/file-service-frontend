import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Header } from './header/Header';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { Row } from '@tanstack/react-table';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';

interface AllNodeTableProps {}

export const AllNodesTable: React.FC<AllNodeTableProps> = () => {
  const { state, dispatch } = useFileSystemNodes();

  async function onDirectoryRowClick(row: Row<FileSystemNodeWithSubRows>) {
    if (!row.getCanExpand()) return;
    if (!row.original.subRows) {
      const subRows = await FileSystemNodeService.findNodesByParentId({ parentId: row.original._id });
      dispatch({ type: 'patchNode', payload: { id: row.original._id, nodePatch: { subRows } } });
    }
    row.getToggleExpandedHandler()();
  }

  return (
    <>
      <Header />
      <FileSystemNodeTable
        data={state.data}
        allowSelection
        onDirectoryRowClick={(row) => onDirectoryRowClick(row)}
        onDirectoryRowSelect={(row) => dispatch({ type: 'setSelectedNode', payload: { selectedNode: row.original } })}
        onFileRowSelect={(row) => dispatch({ type: 'setSelectedNode', payload: { selectedNode: row.original } })}
      />
    </>
  );
};
