import { useState } from 'react';
import { AddNodeForm } from '../../../../features/add-node-form/ui/AddNodeForm';
import { Input } from '../../../../shared/ui/input/Input';
import { Modal } from '../../../../shared/ui/modal/Modal';
import styles from './Header.module.scss';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <section className={styles.tableHeader}>
        <span className={styles.tableTitle}>All files</span>
        <section className={styles.tableFeatures}>
          <Input type="button" value="Add node" onClick={() => setVisible(true)} />
        </section>
      </section>
      <Modal
        visible={visible}
        renderContent={(hide) => <AddNodeForm onHide={hide} />}
        onHide={() => setVisible(false)}
      />
    </>
  );
};
