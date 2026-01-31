// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import RecruiterProfile from '@/pages/profiles/RecruiterProfile';
import { useAuth } from '@/context/useAuth';
import QuestionBuilder from '@/pages/QuestionBuilder';
import QuestionsPreview from '@/pages/QuestionsPreview';
import TestManager from '@/pages/TestManager';

export default function AppRoutes() {
  const {currentUser} = useAuth();
  console.log(currentUser)
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="profile" element={currentUser.role === "RECRUITER" ? <RecruiterProfile /> : ""}/>
      <Route path="question_build" element={<QuestionBuilder/>}></Route>
      <Route path="question_preview" element={<QuestionsPreview/>}></Route>
      <Route path="test_manager" element={<TestManager/>}></Route>

    </Routes>
  );
}
