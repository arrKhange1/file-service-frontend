import styles from './Header.module.scss';
import { AddNode } from '../../../../features/add-node/ui/AddNode';
import { EditNode } from '../../../../features/edit-node/EditNode';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <section className={styles.tableHeader}>
        <span className={styles.tableTitle}>All files</span>
        <section className={styles.tableFeatures}>
          <AddNode />
          <EditNode />
        </section>
      </section>
    </>
  );
};
