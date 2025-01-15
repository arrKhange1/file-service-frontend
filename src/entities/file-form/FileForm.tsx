import { FormProvider, useForm } from 'react-hook-form';
import { FieldWrapper } from '../../shared/ui/input/FieldWrapper/FieldWrapper';
import { Input } from '../../shared/ui/input/Input/Input';
import { FileNode } from '../../shared/api/fs-nodes/fs-nodes.model';
import styles from './FileForm.module.scss';
import { ReactNode } from 'react';
import { NodeFormFooter } from '../node-form-footer/NodeFormFooter';

export type FileForm = Pick<FileNode, 'name' | 'description'>;

interface FileFormProps {
  onSubmit: (fileForm: FileForm) => void;
  currentDir?: ReactNode;
  actionName: string;
}

export const FileForm: React.FC<FileFormProps> = ({ onSubmit, currentDir, actionName }) => {
  const form = useForm<FileForm>({
    defaultValues: { name: '', description: '' },
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

        <NodeFormFooter actionName={actionName} currentDir={currentDir} />
      </form>
    </FormProvider>
  );
};
