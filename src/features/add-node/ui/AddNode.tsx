import { useState } from 'react';
import { Modal } from '../../../shared/ui/modal/Modal';
import { TabSwitcher } from '../../../shared/ui/tab-switcher/TabSwitcher';
import { AddDirectoryForm } from './add-directory-form/AddDirectoryForm';
import { AddFileForm } from './add-file-form/AddFileForm';
import { Input } from '../../../shared/ui/input/Input/Input';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';

interface AddNodeProps {}

export const AddNode: React.FC<AddNodeProps> = () => {
  const [visible, setVisible] = useState(false);
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  return (
    <>
      {selectedNode?.type !== 'FILE' && <Input type="button" value="Add node" onClick={() => setVisible(true)} />}
      <Modal
        visible={visible}
        renderContent={(hide) => (
          <TabSwitcher
            tabs={[
              {
                header: 'Директория',
                content: <AddDirectoryForm onHide={hide} />,
              },
              {
                header: 'Файл',
                content: <AddFileForm onHide={hide} />,
              },
            ]}
          />
        )}
        onHide={() => setVisible(false)}
      />
    </>
  );
};
