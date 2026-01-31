// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import RecruiterProfile from '@/pages/profiles/RecruiterProfile';
import { useAuth } from '@/context/useAuth';

export default function AppRoutes() {
  const {currentUser} = useAuth();
  console.log(currentUser)
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="profile" element={currentUser.role === "RECRUITER" ? <RecruiterProfile /> : ""}/>
      
    </Routes>
  );
}
