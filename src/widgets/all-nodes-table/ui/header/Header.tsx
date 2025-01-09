import { useContext, useState } from 'react';
import { AddNodeForm } from '../../../../features/add-node-form/ui/AddNodeForm';
import { Input } from '../../../../shared/ui/input/Input';
import { Modal } from '../../../../shared/ui/modal/Modal';
import styles from './Header.module.scss';
import { AllNodesContext } from '../../store/all-nodes-context';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [visible, setVisible] = useState(false);
  const ctx = useContext(AllNodesContext);
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
        renderContent={(hide) => <AddNodeForm data={ctx.data} onHide={hide} />}
        onHide={() => setVisible(false)}
      />
    </>
  );
};
