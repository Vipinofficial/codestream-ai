import { Navigate } from 'react-router-dom';
import { User } from '../types';

export default function ProtectedRoute({
  user,
  children,
}: {
  user: User | null;
  children: JSX.Element;
}) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
