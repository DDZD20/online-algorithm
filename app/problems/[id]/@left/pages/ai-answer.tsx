'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from 'ai/react'
import { Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AIAnswer() {
  const [question, setQuestion] = useState('')
  
  const { messages, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [{
      id: '1',
      role: 'system',
      content: '你是一个编程助手，专注于帮助用户解决编程问题。请提供清晰、详细的解答。'
    }],
  })

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-medium p-4 border-b">AI 解答</h3>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            message.role !== 'system' && (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg",
                  message.role === 'assistant' 
                    ? "bg-muted" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            )
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form 
        onSubmit={handleSubmit}
        className="p-4 border-t"
      >
        <div className="flex gap-2">
          <Textarea
            placeholder="询问 AI 助手..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[60px]"
            rows={3}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}