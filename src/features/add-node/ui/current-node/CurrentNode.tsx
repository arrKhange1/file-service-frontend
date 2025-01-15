import { DirectoryItem } from '../../../../entities/directory-item/ui/DirectoryItem';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import styles from './CurrentNode.module.scss';

interface CurrentNodeProps {}

export const CurrentNode: React.FC<CurrentNodeProps> = () => {
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  return (
    <section className={styles.currentDir}>
      <span>Current directory:</span>
      <DirectoryItem name={selectedNode ? selectedNode.name : 'root level'} />
    </section>
  );
};
