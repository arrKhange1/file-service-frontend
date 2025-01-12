import { useFormContext } from 'react-hook-form';
import { DirectoryItem } from '../../../../entities/directory-item/ui/DirectoryItem';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNodeForm.module.scss';

export const AddNodeFormFooter = () => {
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <section className={styles.formFooter}>
      <section className={styles.currentDir}>
        <span>Current directory:</span>
        <DirectoryItem name={selectedNode ? selectedNode.name : 'root level'} />
      </section>
      <Input className={styles.submitBtn} type="submit" value="Добавить" disabled={!isValid} />
    </section>
  );
};
