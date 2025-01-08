import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { Input } from '../../../shared/ui/input/Input';
import styles from './AddNodeForm.module.scss';

interface AddNodeFormProps {
  onHide: () => void;
  data: FileSystemNodeWithSubRows[];
}

export const AddNodeForm: React.FC<AddNodeFormProps> = ({ data, onHide }) => {
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
      <Input type="text" />
      <Input type="text" />
      <Input type="submit" />
    </form>
  );
};
