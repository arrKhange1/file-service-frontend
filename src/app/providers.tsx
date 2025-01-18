import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from './router';

interface ProvidersProps {
  queryClient: QueryClient;
}

export const Providers = ({ queryClient }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  );
};
