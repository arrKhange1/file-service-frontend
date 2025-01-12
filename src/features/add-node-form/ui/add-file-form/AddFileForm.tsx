import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNodeForm.module.scss';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { DirectoryItem } from '../../../../entities/directory-item/ui/DirectoryItem';
import { useFileForm } from '../../model/useFileForm';

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  const { handleSubmit, register, errors, isValid, onSubmit } = useFileForm({ name: '', description: '' }, onHide);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper title="Name" errorMessage={errors.name?.message}>
        <Input
          {...register('name', { validate: (name) => !!name.trim() || 'Name is mandatory' })}
          type="text"
          placeholder="Название файла..."
        />
      </FieldWrapper>
      <FieldWrapper title="Description" errorMessage={errors.description?.message}>
        <Input
          {...register('description', { maxLength: { value: 50, message: 'Max length is 50 letters' } })}
          type="text"
          placeholder="Описание файла..."
        />
      </FieldWrapper>

      <section className={styles.formFooter}>
        <section className={styles.currentDir}>
          <span>Current directory:</span>
          <DirectoryItem name={selectedNode ? selectedNode.name : 'root level'} />
        </section>
        <Input className={styles.submitBtn} type="submit" value="Добавить" disabled={!isValid} />
      </section>
    </form>
  );
};
