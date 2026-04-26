import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Loader2 } from 'lucide-react';
import { DataProvider } from './contexts/DataContext';

// Lazy load pages to reduce initial bundle size
const MapPage = lazy(() => import('./pages/MapPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const UserDetailPage = lazy(() => import('./pages/UserDetailPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full w-full bg-slate-900 text-slate-400">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="text-sm font-medium">Loading...</span>
    </div>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <DataProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MapPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="insights" element={<AnalyticsPage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="user/:username" element={<UserDetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </DataProvider>
    </HashRouter>
  );
};

export default App;
