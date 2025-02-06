'use client';

import { ProblemList } from '@/app/dashboard/problems/problem-list';
import problem from '@/public/problem.json';
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export default function Dashboard() {
  const problems = problem.problems as Problem[];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(problems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProblems = problems.slice(startIndex, startIndex + itemsPerPage);

  const stats = [
    { id: 1, name: 'Total Problems', value: '324' },
    { id: 2, name: 'Solved', value: '156' },
    { id: 3, name: 'Acceptance Rate', value: '72.5%' },
    { id: 4, name: 'Ranking', value: '#1,234' },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">
        <span className="text-orange-500">MeetCode</span>
        <span> - 协同代码刷题平台</span>
      </h1>
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="rounded-lg bg-white p-6 shadow">
            <div className="text-sm text-gray-500">{stat.name}</div>
            <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Problems */}
      <ProblemList problems={currentProblems} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Activity</h2>
        <div className="flex h-64 items-center justify-center rounded bg-gray-50 text-gray-400">
          Activity Chart Placeholder
        </div>
      </div>
    </div>
  );
}