import { Outlet } from 'react-router';
import { ControlPanel } from './ControlPanel';

export const HomePage = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <ControlPanel />
      <Outlet />
    </div>
  );
};
