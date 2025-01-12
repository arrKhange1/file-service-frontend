import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { DirectoryNode } from '../../../shared/api/fs-nodes/fs-nodes.model';

type PartitionParams = 'partitionId';
type DirectoryForm = Pick<DirectoryNode, 'name'>;

type DirectoryFormArgs = {
  defaultValues: DirectoryForm;
  onSubmitSuccess: () => void;
};

export function useDirectoryForm({ defaultValues, onSubmitSuccess }: DirectoryFormArgs) {
  const params = useParams<PartitionParams>();
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();
  const form = useForm<DirectoryForm>({
    defaultValues,
    mode: 'onChange',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  async function onSubmit(directoryForm: DirectoryForm) {
    const parentId = selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const dir = await FileSystemNodeService.addDirectory({
      name: directoryForm.name,
      parentId,
    });

    dispatch({ type: 'addNode', payload: { id: parentId, nodeToAdd: dir } });
    onSubmitSuccess();
  }

  return { onSubmit, handleSubmit, register, errors, form };
}
