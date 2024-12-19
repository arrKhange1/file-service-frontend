import { SelectPartition } from '../../../../features/select-partition/ui/SelectPartition';
import { LogoIcon } from '../../../../shared/icons/LogoIcon';
import styles from './ConrolPanel.module.scss';

export const ControlPanel = () => {
  return (
    <aside className={styles.controlPanel}>
      <LogoIcon />
      <SelectPartition headerText={'Your Dropbox'} />
    </aside>
  );
};
