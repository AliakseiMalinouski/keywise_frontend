import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './app-routes.tsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
