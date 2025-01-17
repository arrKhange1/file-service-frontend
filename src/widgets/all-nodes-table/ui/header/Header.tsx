import styles from './Header.module.scss';
import { AddNode } from '../../../../features/add-node/ui/AddNode';
import { EditNode } from '../../../../features/edit-node/EditNode';
import { useFileSystemNodes } from '../../../../entities/file-system-node-table/model/file-system-nodes-context';
import { DeleteNode } from '../../../../features/delete-node/ui/DeleteNode';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const {
    state: { selectedNode },
  } = useFileSystemNodes();
  return (
    <>
      <section className={styles.tableHeader}>
        <span className={styles.tableTitle}>All files</span>
        <section className={styles.tableFeatures}>
          {selectedNode?.type !== 'FILE' && <AddNode />}
          {selectedNode && <EditNode />}
          {selectedNode && <DeleteNode />}
        </section>
      </section>
    </>
  );
};
