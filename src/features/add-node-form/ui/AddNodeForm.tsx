import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Input } from '../../../shared/ui/input/Input';
import { TabSwitcher } from '../../../shared/ui/tab-switcher/TabSwitcher';
import { AddDirectoryForm } from './add-directory-form/AddDirectoryForm';
import { AddFileForm } from './add-file-form/AddFileForm';
import styles from './AddNodeForm.module.scss';

interface AddNodeFormProps {
  onHide: () => void;
  data: FileSystemNodeWithSubRows[];
}

export const AddNodeForm: React.FC<AddNodeFormProps> = ({ data, onHide }) => {
  return (
    <TabSwitcher
      tabs={[
        {
          header: 'Directory',
          content: <AddDirectoryForm onHide={onHide} />,
        },
        {
          header: 'File',
          content: <AddFileForm onHide={onHide} />,
        },
      ]}
    />
  );
};
