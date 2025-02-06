'use client'

import { useState, useEffect } from 'react'
import Editor from "@monaco-editor/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { defaultCode, type Language } from './defaultCode'

export default function RightPage() {
  const [language, setLanguage] = useState<Language>('javascript')
  const [code, setCode] = useState(defaultCode[language])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setCode(defaultCode[language])
  }, [language])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 p-2 border-b"> {/* 减小padding */}
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as Language)}
        >
          <SelectTrigger className="w-32 h-8 text-xs"> {/* 调整宽度、高度和字体大小 */}
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript" className="text-xs">JavaScript</SelectItem>
            <SelectItem value="typescript" className="text-xs">TypeScript</SelectItem>
            <SelectItem value="python" className="text-xs">Python</SelectItem>
            <SelectItem value="java" className="text-xs">Java</SelectItem>
            <SelectItem value="c" className="text-xs">C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="light" // 改为浅色主题
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            quickSuggestions: true,
            folding: true,
            renderLineHighlight: 'line',
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
          }}
          beforeMount={(monaco) => {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
              noSemanticValidation: false,
              noSyntaxValidation: false,
            })
          }}
        />
      </div>
    </div>
  )
}