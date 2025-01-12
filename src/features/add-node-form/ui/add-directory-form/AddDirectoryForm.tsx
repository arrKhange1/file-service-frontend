import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNodeForm.module.scss';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { useDirectoryForm } from '../../model/useDirectoryForm';
import { FormProvider } from 'react-hook-form';
import { AddNodeFormFooter } from '../AddNodeFormFooter/AddNodeFormFooter';

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  const { onSubmit, handleSubmit, register, errors, form } = useDirectoryForm({ name: '' }, onHide);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper title="Name" errorMessage={errors.name?.message}>
        <Input
          {...register('name', { validate: (name) => !!name.trim() || 'Name is mandatory' })}
          type="text"
          placeholder="Название директории..."
        />
      </FieldWrapper>

      <FormProvider {...form}>
        <AddNodeFormFooter />
      </FormProvider>
    </form>
  );
};
