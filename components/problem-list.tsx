
  
  interface ProblemListProps {
    problems: Problem[];
  }
  
  export function ProblemList({ problems }: ProblemListProps) {
    const difficultyColors = {
      Easy: 'text-green-600',
      Medium: 'text-yellow-600',
      Hard: 'text-red-600'
    }
  
    const statusColors = {
      Solved: 'bg-green-100 text-green-800',
      Attempted: 'bg-yellow-100 text-yellow-800',
      Todo: 'bg-gray-100 text-gray-800'
    }
  
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Recent Problems</h2>
        </div>
        <div className="divide-y">
          {problems.map(problem => (
            <div key={problem.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{problem.title}</h3>
                <span className={`text-sm ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[problem.status]}`}>
                {problem.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }