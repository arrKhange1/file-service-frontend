import { useForm } from 'react-hook-form';
import { FileNode } from '../../../../shared/api/fs-nodes/fs-nodes.model';
import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNodeForm.module.scss';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';

type FileForm = Pick<FileNode, 'name' | 'description'>;

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FileForm>({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onChange',
  });
  return (
    <form className={styles.form} onSubmit={() => onHide()}>
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

      <Input className={styles.submitBtn} type="submit" value="Добавить" disabled={!isValid} />
    </form>
  );
};
