import { Outlet } from 'react-router';
import { ControlPanel } from '../control-panel/ControlPanel';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ControlPanel />
      <Outlet />
    </div>
  );
};
