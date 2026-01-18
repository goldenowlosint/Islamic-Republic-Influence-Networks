import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MapPage from './pages/MapPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TimelinePage from './pages/TimelinePage';
import UserDetailPage from './pages/UserDetailPage';

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
