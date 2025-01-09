import { TabSwitcher } from '../../../shared/ui/tab-switcher/TabSwitcher';
import { AddDirectoryForm } from './add-directory-form/AddDirectoryForm';
import { AddFileForm } from './add-file-form/AddFileForm';

interface AddNodeFormProps {
  onHide: () => void;
}

export const AddNodeForm: React.FC<AddNodeFormProps> = ({ onHide }) => {
  return (
    <TabSwitcher
      tabs={[
        {
          header: 'Директория',
          content: <AddDirectoryForm onHide={onHide} />,
        },
        {
          header: 'Файл',
          content: <AddFileForm onHide={onHide} />,
        },
      ]}
    />
  );
};
