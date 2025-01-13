import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNode.module.scss';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';
import { useFileForm } from '../../model/useFileForm';
import { FormProvider } from 'react-hook-form';
import { AddNodeFormFooter } from '../AddNodeFormFooter/AddNodeFormFooter';

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  const { handleSubmit, register, errors, form, onSubmit } = useFileForm({
    defaultValues: { name: '', description: '' },
    onSubmitSuccess: onHide,
  });

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

      <FormProvider {...form}>
        <AddNodeFormFooter />
      </FormProvider>
    </form>
  );
};
