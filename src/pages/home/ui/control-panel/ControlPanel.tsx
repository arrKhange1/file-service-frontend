import { SelectPartition } from '../../../../features/select-partition/ui/SelectPartition';
import styles from './ConrolPanel.module.scss';

export const ControlPanel = () => {
  return (
    <aside className={styles.controlPanel}>
      <img src="src/app/icons/logo.svg" />
      <SelectPartition headerText={'Your Dropbox'} />
    </aside>
  );
};
