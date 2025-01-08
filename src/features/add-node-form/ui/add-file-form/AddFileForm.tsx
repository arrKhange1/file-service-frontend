import { Input } from '../../../../shared/ui/input/Input';
import styles from '../AddNodeForm.module.scss';

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
      <Input type="text" placeholder="Название файла..." />
      <Input className={styles.submitBtn} type="submit" value="Добавить" />
    </form>
  );
};
