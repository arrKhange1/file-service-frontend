import { DirectoryForm } from '../../../../entities/directory-form/DirectoryForm';
import { useParams } from 'react-router';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileSystemNodeService } from '../../../../shared/api/fs-nodes/fs-nodes.service';

interface AddDirectoryFormProps {
  onHide: () => void;
}

export const AddDirectoryForm: React.FC<AddDirectoryFormProps> = ({ onHide }) => {
  const params = useParams();
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();
  async function onSubmit(directoryForm: DirectoryForm) {
    const parentId = selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const dir = await FileSystemNodeService.addDirectory({
      name: directoryForm.name,
      parentId,
    });

    dispatch({ type: 'addNode', payload: { id: parentId, nodeToAdd: dir } });
    onHide();
  }

  return <DirectoryForm onSubmit={onSubmit} />;
};
