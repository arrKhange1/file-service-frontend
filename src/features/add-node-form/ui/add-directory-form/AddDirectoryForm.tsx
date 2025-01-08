import { Input } from '../../../../shared/ui/input/Input';
import styles from '../AddNodeForm.module.scss';

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
      <Input type="text" placeholder="Название директории..." />
      <Input className={styles.submitBtn} type="submit" value="Добавить" />
    </form>
  );
};
