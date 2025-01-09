import { useState, useEffect } from 'react';
import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { expandRow } from '../../../features/expand-row/lib/expand-row';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Header } from './header/Header';
import { AllNodesContext } from '../store/all-nodes-context';

interface AllNodeTableProps {
  rootData: FileSystemNodeWithSubRows[];
}

export const AllNodesTable: React.FC<AllNodeTableProps> = ({ rootData }) => {
  const [data, setData] = useState<FileSystemNodeWithSubRows[]>(rootData);
  const [selectedNode, setSelectedNode] = useState<FileSystemNodeWithSubRows | null>(null);
  useEffect(() => {
    // TODO: убрать
    setData(rootData);
  }, [rootData]);

  return (
    <>
      <AllNodesContext.Provider value={{ data, onDataChange: (updatedData) => setData(updatedData), selectedNode }}>
        <Header />
      </AllNodesContext.Provider>
      <FileSystemNodeTable
        data={data}
        allowSelection
        onDirectoryRowClick={(row) => expandRow(row, setData)}
        onDirectoryRowSelect={(row) => setSelectedNode(row.original)}
      />
    </>
  );
};
