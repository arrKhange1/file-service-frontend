import { FormProvider, useForm } from 'react-hook-form';
import { FieldWrapper } from '../../shared/ui/input/FieldWrapper/FieldWrapper';
import { Input } from '../../shared/ui/input/Input/Input';
import { DirectoryNode } from '../../shared/api/fs-nodes/fs-nodes.model';
import styles from './DirectoryForm.module.scss';

export type DirectoryForm = Pick<DirectoryNode, 'name'>;

interface DirectoryFormProps {
  onSubmit: (directoryForm: DirectoryForm) => void;
  defaultValues?: DirectoryForm;
}

export const DirectoryForm: React.FC<DirectoryFormProps> = ({ onSubmit, defaultValues }) => {
  const form = useForm<DirectoryForm>({
    defaultValues: { name: defaultValues?.name ?? '' },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = form;
  return (
    <FormProvider {...form}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper title="Name" errorMessage={errors.name?.message}>
          <Input
            {...register('name', { validate: (name) => !!name.trim() || 'Name is mandatory' })}
            type="text"
            placeholder="Название директории..."
          />
        </FieldWrapper>

        <Input className={styles.submitBtn} type="submit" value="Применить" disabled={!isValid} />
      </form>
    </FormProvider>
  );
};
