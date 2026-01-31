import { useNavigate } from 'react-router-dom';
import { Challenge } from '@/types';

export default function DashboardPage({
  // challenges,
}: {
  // challenges: Challenge[];
}) {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      {/* {challenges.map(c => (
        <div
          key={c.id}
          onClick={() => navigate(`/assessment/${c.id}/start`)}
          className="cursor-pointer border p-4 rounded mb-4"
        >
          <h3>{c.title}</h3>
          <p>{c.description}</p>
        </div>
      ))} */}
    </div>
  );
}
