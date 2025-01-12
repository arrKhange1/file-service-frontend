import { useForm } from 'react-hook-form';
import { FileNode } from '../../../../shared/api/fs-nodes/fs-nodes.model';
import { Input } from '../../../../shared/ui/input/Input/Input';
import styles from '../AddNodeForm.module.scss';
import { FieldWrapper } from '../../../../shared/ui/input/FieldWrapper/FieldWrapper';
import { useParams } from 'react-router';
import { FileSystemNodeService } from '../../../../shared/api/fs-nodes/fs-nodes.service';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { DirectoryItem } from '../../../../entities/directory-item/ui/DirectoryItem';

type PartitionParams = 'partitionId';

type FileForm = Pick<FileNode, 'name' | 'description'>;

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  const params = useParams<PartitionParams>();
  const { state, dispatch } = useFileSystemNodes();
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

  async function onSubmit(fileForm: FileForm) {
    const parentId = state.selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const file = await FileSystemNodeService.addFile({
      name: fileForm.name,
      description: fileForm.description,
      parentId,
    });

    dispatch({ type: 'addNode', payload: { id: parentId, nodeToAdd: file } });
    onHide();
  }

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
          <DirectoryItem name={state.selectedNode ? state.selectedNode.name : 'root level'} />
        </section>
        <Input className={styles.submitBtn} type="submit" value="Добавить" disabled={!isValid} />
      </section>
    </form>
  );
};
