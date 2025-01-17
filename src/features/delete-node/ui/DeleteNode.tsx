import { useFileSystemNodes } from '../../../entities/file-system-node-table/model/file-system-nodes-context';
import { FileSystemNodeService } from '../../../shared/api/fs-nodes/fs-nodes.service';
import { Input } from '../../../shared/ui/input/Input/Input';

interface DeleteNodeProps {}

export const DeleteNode: React.FC<DeleteNodeProps> = () => {
  const {
    state: { selectedNode },
    dispatch,
  } = useFileSystemNodes();

  async function deleteNode() {
    if (!selectedNode) return;
    await FileSystemNodeService.deleteNodeById({ id: selectedNode._id });
    dispatch({ type: 'deleteNode', payload: { id: selectedNode._id } });
    dispatch({ type: 'setSelectedNode', payload: { selectedNode: undefined } });
  }

  return <Input type="button" value="Delete node" onClick={deleteNode} />;
};
