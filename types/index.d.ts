interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'Solved' | 'Attempted' | 'Todo';
}