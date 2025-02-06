'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProblemDescription } from "./pages/problem-description"
import { PartnerEditor } from "./pages/partner-editor"
import { Result } from "./pages/result"
import { AIAnswer } from "./pages/ai-answer"
import { useParams } from 'next/navigation'

export default function LeftPage() {
  const params = useParams()
  return (
    <Tabs defaultValue="description" className="h-full">
      <div className="border-b">
        <TabsList className="h-8 w-fit bg-transparent border-b-0 px-5"> {/* 修改这里 */}
          <TabsTrigger 
            value="description" 
            className="text-xs h-7 px-3 data-[state=active]:bg-background"
          >
            题目描述
          </TabsTrigger>
          <TabsTrigger 
            value="partner" 
            className="text-xs h-7 px-3 data-[state=active]:bg-background"
          >
            协作编辑
          </TabsTrigger>
          <TabsTrigger 
            value="result" 
            className="text-xs h-7 px-3 data-[state=active]:bg-background"
          >
            执行结果
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className="text-xs h-7 px-3 data-[state=active]:bg-background"
          >
            AI 解答
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="h-[calc(100%-2rem)] overflow-auto">
        <TabsContent value="description" className="mt-0 p-4 h-full">
          <ProblemDescription id={params.id as string} />  
        </TabsContent>
        
        <TabsContent value="partner" className="mt-0 p-4 h-full">
          <PartnerEditor />
        </TabsContent>
        
        <TabsContent value="result" className="mt-0 p-4 h-full">
          <Result />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-0 p-4 h-full">
          <AIAnswer />
        </TabsContent>
      </div>
    </Tabs>
  )
}