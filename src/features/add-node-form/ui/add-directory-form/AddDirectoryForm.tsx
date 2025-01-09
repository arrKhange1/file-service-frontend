import React from 'react';
import { Input } from '../../../../shared/ui/input/Input';
import { AllNodesContext } from '../../../../widgets/all-nodes-table/store/all-nodes-context';
import styles from '../AddNodeForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { DirectoryNode } from '../../../../shared/api/fs-nodes/fs-nodes.model';

type DirectoryForm = Pick<DirectoryNode, 'name'>;

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  const ctx = React.useContext(AllNodesContext);
  const { control, handleSubmit } = useForm<DirectoryForm>({
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(directoryForm: DirectoryForm): void {
    console.log(directoryForm);

    onHide();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field: { value: name, onChange } }) => (
          <Input type="text" placeholder="Название директории..." onChange={onChange} value={name} />
        )}
      />

      <Input className={styles.submitBtn} type="submit" value="Добавить" />
    </form>
  );
};
