import { useParams, useNavigate } from 'react-router-dom';
import { Challenge } from '../../types';

export default function AssessmentStartPage({
  challenges,
}: {
  challenges: Challenge[];
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const challenge = challenges.find(c => c.id === id);
  if (!challenge) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <button
        onClick={() => navigate(`/assessment/${id}`)}
        className="px-6 py-3 bg-indigo-600 text-white rounded"
      >
        Start Assessment
      </button>
    </div>
  );
}
