import { useState, useEffect } from 'react';
import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { expandRow } from '../../../features/expand-row/lib/expand-row';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';

interface AllNodeTableProps {
  rootData: FileSystemNodeWithSubRows[];
}

export const AllNodesTable: React.FC<AllNodeTableProps> = ({ rootData }) => {
  const [data, setData] = useState<FileSystemNodeWithSubRows[]>(rootData);
  useEffect(() => {
    setData(rootData);
  }, [rootData]);

  return <FileSystemNodeTable data={data} allowSelection onDirectoryRowClick={(row) => expandRow(row, setData)} />;
};
