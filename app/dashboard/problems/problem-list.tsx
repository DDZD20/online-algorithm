import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateQuestionRoom } from './create-question-room';


export function ProblemList({ problems }: ProblemListProps) {
  const router = useRouter();

  const difficultyColors = {
    Easy: 'text-green-600',
    Medium: 'text-yellow-600',
    Hard: 'text-red-600',
  };

  const statusColors = {
    Solved: 'bg-green-100 text-green-800',
    Attempted: 'bg-yellow-100 text-yellow-800',
    Todo: 'bg-gray-100 text-gray-800',
  };

  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProblemClick = (problemId: string) => {
    setSelectedProblem(problemId);
    setIsModalOpen(true);
  };

  const handleCreateRoom = (settings: any) => {
    const queryParams = new URLSearchParams({
      mode: settings.mode,
      maxPlayers: settings.maxPlayers.toString(),
      ...(settings.password && { password: settings.password }),
    });

    setIsModalOpen(false);
    router.push(`/problems/${selectedProblem}?${queryParams.toString()}`);
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">算法题目列表</h2>
      </div>
      <div
        className="divide-y"
        onClick={(e) => {
          // 防止冒泡，避免触发子元素的点击事件
          if (e.target === e.currentTarget) {
            return;
          }
        }}
      >
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="group relative flex cursor-pointer items-center justify-between overflow-hidden px-6 py-4 transition-all duration-200 hover:bg-gray-50"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ripple = document.createElement('div');
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              ripple.className = 'ripple-effect';
              ripple.style.left = `${x}px`;
              ripple.style.top = `${y}px`;

              e.currentTarget.appendChild(ripple);

              setTimeout(() => ripple.remove(), 1000);

              handleProblemClick(problem.id.toString());
            }}
          >
            <div>
              <h3 className="font-medium">
                {problem.id + '. ' + problem.title}
              </h3>
              <span
                className={`text-sm ${difficultyColors[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-xs ${statusColors[problem.status]}`}
            >
              {problem.status}
            </span>
          </div>
        ))}
      </div>

      <CreateQuestionRoom
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateRoom}
        problemId={selectedProblem || ''}
      />
    </div>
  );
}
