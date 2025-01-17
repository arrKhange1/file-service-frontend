import { FileForm } from '../../../entities/file-form/FileForm';
import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileNode } from '../../../shared/api/fs-nodes/fs-nodes.model';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';

interface EditFileFormProps {
  onHide: () => void;
}

export const EditFileForm: React.FC<EditFileFormProps> = ({ onHide }) => {
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();
  async function onSubmit(directoryForm: FileForm) {
    if (!selectedNode) return;
    await FileSystemNodeService.patchDirectory(selectedNode._id, { name: directoryForm.name });
    dispatch({ type: 'patchNode', payload: { id: selectedNode._id, nodePatch: directoryForm } });
    onHide();
  }

  return <FileForm onSubmit={onSubmit} defaultValues={selectedNode as FileNode} />;
};
