import { LogoIcon } from '../../../shared/icons/LogoIcon';
import { PartitionList } from '../../../widgets/partition-list/ui/PartitionList';
import styles from './ConrolPanel.module.scss';

export const ControlPanel = () => {
  return (
    <aside className={styles.controlPanel}>
      <LogoIcon />
      <PartitionList />
    </aside>
  );
};
