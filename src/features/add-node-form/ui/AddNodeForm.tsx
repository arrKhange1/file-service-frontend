import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Input } from '../../../shared/ui/input/Input';
import { TabSwitcher } from '../../../shared/ui/tab-switcher/TabSwitcher';
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
          content: (
            <form className={styles.form} onSubmit={() => onHide()}>
              <Input type="text" placeholder="Название директории..." />
              <Input type="submit" value="Добавить" />
            </form>
          ),
        },
        {
          header: 'File',
          content: (
            <form className={styles.form} onSubmit={() => onHide()}>
              <Input type="text" placeholder="Название файла..." />
              <Input type="submit" value="Добавить" />
            </form>
          ),
        },
      ]}
    />
  );
};
