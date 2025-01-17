import { useState } from 'react';
import { Input } from '../../shared/ui/input/Input/Input';
import { Modal } from '../../shared/ui/modal/Modal';
import { EditDirectoryForm } from './edit-directory-form/EditDirectoryForm';
import { EditFileForm } from './edit-file-form/EditFileForm';
import { useFileSystemNodes } from '../../entities/file-system-node-table/model/file-system-nodes-context';

interface EditNodeProps {}

export const EditNode = () => {
  const [visible, setVisible] = useState(false);
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  return (
    <>
      <Input type="button" value={'Edit node'} onClick={() => setVisible(true)} />
      <Modal
        visible={visible}
        renderContent={(hide) => (
          <>
            {selectedNode?.type === 'DIRECTORY' ? <EditDirectoryForm onHide={hide} /> : <EditFileForm onHide={hide} />}
          </>
        )}
        onHide={() => setVisible(false)}
      />
    </>
  );
};
