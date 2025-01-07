import { ProblemList } from "@/components/problem-list";

export default function Dashboard() {
    // 假数据
    const stats = [
      { id: 1, name: 'Total Problems', value: '324' },
      { id: 2, name: 'Solved', value: '156' },
      { id: 3, name: 'Acceptance Rate', value: '72.5%' },
      { id: 4, name: 'Ranking', value: '#1,234' },
    ]
  
    const problems: Problem[] = [
      { id: 1, title: 'Two Sum', difficulty: 'Easy', status: 'Solved' },
      { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', status: 'Attempted' },
      { id: 3, title: 'Longest Substring', difficulty: 'Medium', status: 'Todo' },
      { id: 4, title: 'Median of Arrays', difficulty: 'Hard', status: 'Solved' },
    ]
  
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-500">{stat.name}</div>
              <div className="text-2xl font-semibold mt-2">{stat.value}</div>
            </div>
          ))}
        </div>
  
        {/* Recent Problems */}
        <ProblemList problems={problems} />

        {/* Activity Chart Placeholder */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Activity</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Activity Chart Placeholder
          </div>
        </div>
      </div>
    )
  }