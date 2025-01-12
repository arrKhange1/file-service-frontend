import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { FileNode } from '../../../shared/api/fs-nodes/fs-nodes.model';

type PartitionParams = 'partitionId';
type FileForm = Pick<FileNode, 'name' | 'description'>;

export function useFileForm(defaultValues: FileForm, onSubmitSuccess: () => void) {
  const params = useParams<PartitionParams>();
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FileForm>({
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(fileForm: FileForm) {
    const parentId = selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const file = await FileSystemNodeService.addFile({
      name: fileForm.name,
      description: fileForm.description,
      parentId,
    });

    dispatch({ type: 'addNode', payload: { id: parentId, nodeToAdd: file } });
    onSubmitSuccess();
  }

  return { onSubmit, handleSubmit, register, errors, isValid };
}
