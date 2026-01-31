import { Navigate } from 'react-router-dom';
import { User, UserRole } from '../types';

export default function RoleRoute({
  user,
  role,
  children,
}: {
  user: User;
  role: UserRole;
  children: JSX.Element;
}) {
  if (user.role !== role) return <Navigate to="/" replace />;
  return children;
}
