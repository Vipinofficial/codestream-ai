import { useParams } from 'react-router-dom';
import Editor from '@/components/Editor';
import { Challenge } from '@/types';

export default function AssessmentSessionPage({
  challenges,
}: {
  challenges: Challenge[];
}) {
  const { id } = useParams();
  const challenge = challenges.find(c => c.id === id);

  if (!challenge) return null;

  return <Editor challenge={challenge} />;
}
