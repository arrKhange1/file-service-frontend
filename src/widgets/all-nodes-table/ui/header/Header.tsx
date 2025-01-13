import styles from './Header.module.scss';
import { AddNode } from '../../../../features/add-node/ui/AddNode';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <section className={styles.tableHeader}>
        <span className={styles.tableTitle}>All files</span>
        <section className={styles.tableFeatures}>
          <AddNode />
        </section>
      </section>
    </>
  );
};
