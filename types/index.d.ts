interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'Solved' | 'Attempted' | 'Todo';
}

interface ProblemListProps {
    problems: Problem[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }