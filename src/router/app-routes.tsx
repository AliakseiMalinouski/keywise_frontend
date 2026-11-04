import { Route, Routes } from 'react-router-dom';

import { NotFound } from '&containers/not-found';

import App from '../App.tsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
