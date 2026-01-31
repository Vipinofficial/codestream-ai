// src/layouts/ProtectedLayout.tsx
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout';
import { User } from '../types';

interface Props {
  currentUser: User | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

export default function ProtectedLayout({
  currentUser,
  theme,
  toggleTheme,
  onLogout,
}: Props) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout
      currentUser={currentUser}
      theme={theme}
      toggleTheme={toggleTheme}
      onLogout={onLogout}
    >
      <Outlet />
    </Layout>
  );
}
