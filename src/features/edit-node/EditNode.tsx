import { useState } from 'react';
import { Input } from '../../shared/ui/input/Input/Input';
import { Modal } from '../../shared/ui/modal/Modal';
import { TabSwitcher } from '../../shared/ui/tab-switcher/TabSwitcher';
import { EditDirectoryForm } from './edit-directory-form/EditDirectoryForm';
import { EditFileForm } from './edit-file-form/EditFileForm';

interface EditNodeProps {}

export const EditNode = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Input type="button" value={'Edit node'} onClick={() => setVisible(true)} />
      <Modal
        visible={visible}
        renderContent={(hide) => (
          <TabSwitcher
            tabs={[
              {
                header: 'Директория',
                content: <EditDirectoryForm onHide={hide} />,
              },
              {
                header: 'Файл',
                content: <EditFileForm onHide={hide} />,
              },
            ]}
          />
        )}
        onHide={() => setVisible(false)}
      />
    </>
  );
};
