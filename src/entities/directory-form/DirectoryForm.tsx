import { FormProvider, useForm } from 'react-hook-form';
import { NodeFormFooter } from '../node-form-footer/NodeFormFooter';
import { FieldWrapper } from '../../shared/ui/input/FieldWrapper/FieldWrapper';
import { Input } from '../../shared/ui/input/Input/Input';
import { DirectoryNode } from '../../shared/api/fs-nodes/fs-nodes.model';
import styles from './DirectoryForm.module.scss';
import { ReactNode } from 'react';

export type DirectoryForm = Pick<DirectoryNode, 'name'>;

interface DirectoryFormProps {
  onSubmit: (directoryForm: DirectoryForm) => void;
  currentDir?: ReactNode;
  actionName: string;
}

export const DirectoryForm: React.FC<DirectoryFormProps> = ({ onSubmit, actionName, currentDir }) => {
  const form = useForm<DirectoryForm>({
    defaultValues: { name: '' },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
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

        <NodeFormFooter actionName={actionName} currentDir={currentDir} />
      </form>
    </FormProvider>
  );
};
