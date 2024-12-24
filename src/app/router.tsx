import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../pages/home/ui/home-page/HomePage';
import { PartitionPage } from '../pages/partition/ui/PartitionPage';
import { NothingSelected } from '../pages/home/ui/nothing-selected/NothingSelected';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<NothingSelected />} />
          <Route path=":partitionId" element={<PartitionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
