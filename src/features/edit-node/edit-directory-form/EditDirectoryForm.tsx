import { DirectoryForm } from '../../../entities/directory-form/DirectoryForm';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';

interface EditDirectoryFormProps {
  onHide: () => void;
}

export const EditDirectoryForm: React.FC<EditDirectoryFormProps> = ({ onHide }) => {
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();
  async function onSubmit(directoryForm: DirectoryForm) {
    if (!selectedNode) return;
    await FileSystemNodeService.patchDirectory(selectedNode._id, { name: directoryForm.name });
    dispatch({ type: 'patchNode', payload: { id: selectedNode._id, nodePatch: directoryForm } });
    onHide();
  }

  return <DirectoryForm onSubmit={onSubmit} defaultValues={selectedNode} />;
};
