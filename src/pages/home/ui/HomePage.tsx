import { Outlet } from 'react-router';

export const HomePage = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <span>Its HomePage</span>
      <Outlet />
    </div>
  );
};
