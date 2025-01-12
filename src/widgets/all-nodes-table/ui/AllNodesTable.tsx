import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { Header } from './header/Header';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { useExpandRow } from '../../../features/expand-row/lib/useExpandRow';

interface AllNodeTableProps {}

export const AllNodesTable: React.FC<AllNodeTableProps> = () => {
  const { dispatch } = useFileSystemNodes();
  const { onDirectoryRowClick } = useExpandRow();

  return (
    <>
      <Header />
      <FileSystemNodeTable
        allowSelection
        onDirectoryRowClick={(row) => onDirectoryRowClick(row)}
        onDirectoryRowSelect={(row) => dispatch({ type: 'setSelectedNode', payload: { selectedNode: row.original } })}
        onFileRowSelect={(row) => dispatch({ type: 'setSelectedNode', payload: { selectedNode: row.original } })}
      />
    </>
  );
};
