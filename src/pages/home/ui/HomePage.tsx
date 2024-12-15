import { Outlet } from 'react-router';
import { ControlPanel } from './ControlPanel';

export const HomePage = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ControlPanel />
      <Outlet />
    </div>
  );
};
