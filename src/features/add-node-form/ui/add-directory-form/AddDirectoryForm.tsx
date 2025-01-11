import { useContext } from 'react';
import { Input } from '../../../../shared/ui/input/Input/Input';
import { AllNodesContext } from '../../../../widgets/all-nodes-table/store/all-nodes-context';
import styles from '../AddNodeForm.module.scss';
import { useForm } from 'react-hook-form';
import { DirectoryNode } from '../../../../shared/api/fs-nodes/fs-nodes.model';
import { FileSystemNodeService } from '../../../../shared/api/fs-nodes/fs-nodes.service';
import { RowsMutationService } from '../../../../shared/lib/rows-mutation.service';
import { useParams } from 'react-router';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';

type PartitionParams = 'partitionId';

type DirectoryForm = Pick<DirectoryNode, 'name'>;

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  const params = useParams<PartitionParams>();
  const ctx = useContext(AllNodesContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<DirectoryForm>({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(directoryForm: DirectoryForm) {
    const parentId = ctx.selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const dir = await FileSystemNodeService.addDirectory({
      name: directoryForm.name,
      parentId,
    });
    const updatedData = RowsMutationService.addNode(ctx.data, parentId, dir);

    ctx.onDataChange(updatedData);
    onHide();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper title="Name" errorMessage={errors.name?.message}>
        <Input
          {...register('name', { validate: (name) => !!name.trim() || 'Name is mandatory' })}
          type="text"
          placeholder="Название директории..."
        />
      </FieldWrapper>

      <Input className={styles.submitBtn} type="submit" value="Добавить" disabled={!isValid} />
    </form>
  );
};
