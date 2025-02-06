import type { Metadata } from 'next'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode
  left: React.ReactNode  // 左侧内容
  right: React.ReactNode // 右侧内容
  params: { id: string }
}

export default function ProblemLayout({
  left,
  right,
  params,
}: Props) {
  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">MeetCode</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <Button variant="outline" size="sm">
              运行
            </Button>
            <Button variant="outline" size="sm">
              提交
            </Button>
          </div>

          <div className="flex-1 flex justify-end">
            <Avatar>
              <AvatarImage src="/cat.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <div className="w-[50%] border-r flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            {left}
          </div>
        </div>

        <div className="flex-1 min-h-0">
          {right}
        </div>
      </div>
    </div>
  )
}