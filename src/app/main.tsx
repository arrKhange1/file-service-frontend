import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../pages/home/ui/HomePage.tsx';
import { PartitionPage } from '../pages/partition/ui/PartitionPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path=":partitionId" element={<PartitionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
