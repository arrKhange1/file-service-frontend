import { FileForm } from '../../../../entities/file-form/FileForm';
import { FileSystemNodeService } from '../../../../shared/api/fs-nodes/fs-nodes.service';
import { useParams } from 'react-router';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';

interface AddFileFormProps {
  onHide: () => void;
}

export const AddFileForm: React.FC<AddFileFormProps> = ({ onHide }) => {
  const params = useParams();
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();

  async function onSubmit(fileForm: FileForm) {
    const parentId = selectedNode?._id ?? params.partitionId;
    if (!parentId) throw new Error('parentId должен присутствовать (хотя бы в роуте)');

    const file = await FileSystemNodeService.addFile({
      name: fileForm.name,
      description: fileForm.description,
      parentId,
    });

    dispatch({ type: 'addNode', payload: { id: parentId, nodeToAdd: file } });
    onHide();
  }

  return <FileForm onSubmit={onSubmit} />;
};
