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
    await FileSystemNodeService.patchDirectory(selectedNode._id, directoryForm);
    dispatch({ type: 'patchNode', payload: { id: selectedNode._id, nodePatch: directoryForm } });
    dispatch({ type: 'setSelectedNode', payload: { selectedNode: { ...selectedNode, ...directoryForm } } });
    onHide();
  }

  return <DirectoryForm onSubmit={onSubmit} defaultValues={selectedNode} />;
};
