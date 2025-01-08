import { useState, useEffect } from 'react';
import { FileSystemNodeTable } from '../../../entities/file-system-node-table/ui/FileSystemNodeTable';
import { expandRow } from '../../../features/expand-row/lib/expand-row';
import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Modal } from '../../../shared/ui/modal/Modal';
import { AddNodeForm } from '../../../features/add-node-form/ui/AddNodeForm';

interface AllNodeTableProps {
  rootData: FileSystemNodeWithSubRows[];
}

export const AllNodesTable: React.FC<AllNodeTableProps> = ({ rootData }) => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState<FileSystemNodeWithSubRows[]>(rootData);
  useEffect(() => {
    setData(rootData);
  }, [rootData]);

  return (
    <>
      <button onClick={() => setVisible(true)}>Add node</button>
      <Modal
        visible={visible}
        renderContent={(hide) => <AddNodeForm data={data} onHide={hide} />}
        onHide={() => setVisible(false)}
      />
      <FileSystemNodeTable data={data} allowSelection onDirectoryRowClick={(row) => expandRow(row, setData)} />
    </>
  );
};
