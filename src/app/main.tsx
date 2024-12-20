import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers.tsx';
import { queryClient } from '../shared/api/query-client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers queryClient={queryClient} />
  </StrictMode>,
);
