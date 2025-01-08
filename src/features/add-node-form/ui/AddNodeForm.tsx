import { FileSystemNodeWithSubRows } from '../../../shared/api/fs-nodes/fs-nodes.model';
import styles from './AddNodeForm.module.scss';

interface AddNodeFormProps {
  onHide: () => void;
  data: FileSystemNodeWithSubRows[];
}

export const AddNodeForm: React.FC<AddNodeFormProps> = ({ data, onHide }) => {
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
      <input type="text" value="aboba" />
      <input type="text" value="aboba" />
      <input type="text" value="aboba" />
      <input type="submit" />
    </form>
  );
};
