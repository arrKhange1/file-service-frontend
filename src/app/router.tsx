import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../pages/home/ui/home-page/HomePage';
import { PartitionPage } from '../pages/partition/ui/PartitionPage';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path=":partitionId" element={<PartitionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
