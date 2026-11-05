import { Route, Routes } from 'react-router-dom';

import { NotFound } from '&pages/not-found';
import { AboutPage } from '&pages/about';
import { RootPage } from '&pages/root';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
