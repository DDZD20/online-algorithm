'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LoginFormData {
  email: string
  password: string
}

/**
 * 登录页面组件
 * @component
 * @description 提供用户登录功能，包含邮箱和密码的表单验证
 * @returns {JSX.Element} 登录页面组件
 */
export default function LoginPage(): React.ReactElement {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || '登录失败')
      }

      toast({
        title: "登录成功",
        description: "正在跳转...",
      })

      router.push('/dashboard')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登录失败",
        description: error instanceof Error ? error.message : '邮箱或密码错误',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">登录</h1>
          <p className="mt-2 text-sm text-gray-600">
            还没有账号？
            <Link href="/register" className="text-blue-600 hover:text-blue-800">
              立即注册
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="邮箱地址"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="密码"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
                忘记密码？
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </form>
      </div>
    </div>
  )
}