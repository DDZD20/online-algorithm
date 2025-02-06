'use client'

import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import Editor, { OnMount } from "@monaco-editor/react"
import type { editor } from 'monaco-editor'
import type { Language } from '@/app/problems/[id]/@right/defaultCode'

interface CollaborativeEditorProps {
  language: Language
  value: string
  onChange?: (value: string | undefined) => void
  roomName: string
}

export default function CollaborativeEditor({
  language,
  value,
  onChange,
  roomName
}: CollaborativeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<any>(null)

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return

    // 初始化 Yjs
    const doc = new Y.Doc()
    
    // 连接到 WebSocket 服务器
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234', // 需要替换为您的 WebSocket 服务器地址
      roomName,
      doc
    )

    // 创建共享文本
    const ytext = doc.getText('monaco')

    // 绑定 Monaco Editor 和 Yjs
    const binding = new MonacoBinding(
      ytext,
      editorRef.current.getModel()!,
      new Set([editorRef.current]),
      wsProvider.awareness
    )

    // 清理函数
    return () => {
      binding.destroy()
      wsProvider.destroy()
      doc.destroy()
    }
  }, [roomName])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // 设置初始值
    if (value) {
      editor.setValue(value)
    }
  }

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={onChange}
      theme="light"
      onMount={handleEditorDidMount}
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
  )
}