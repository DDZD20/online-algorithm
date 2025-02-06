// app/problems/[id]/@left/pages/problem-description.tsx
'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

async function fetchMarkdown(id: string) {
  try {
    const response = await fetch(`/markdown/${id}、two-sum.md`);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown');
    }
    const text = await response.text();
    
    // 移除 frontmatter
    const content = text.replace(/^---[\s\S]*?---/, '').trim();
    return content;
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return null;
  }
}

export function ProblemDescription({ id }: { id: string }) {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetchMarkdown(id).then(setContent);
  }, [id]);

  return (
    <div className="prose dark:prose-invert max-w-none px-4">
      {content ? (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  );
}