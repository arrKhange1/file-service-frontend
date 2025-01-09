import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { TabSwitcher } from '../../../shared/ui/tab-switcher/TabSwitcher';
import { AddDirectoryForm } from './add-directory-form/AddDirectoryForm';
import { AddFileForm } from './add-file-form/AddFileForm';

interface AddNodeFormProps {
  onHide: () => void;
  data: FileSystemNodeWithSubRows[];
}

export const AddNodeForm: React.FC<AddNodeFormProps> = ({ data, onHide }) => {
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
