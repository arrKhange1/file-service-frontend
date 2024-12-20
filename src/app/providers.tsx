import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from './router';
import { PrimeReactProvider } from 'primereact/api';

interface ProvidersProps {
  queryClient: QueryClient;
}

export const Providers = ({ queryClient }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <RouterProvider />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
};
