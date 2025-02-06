'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

/**
 * 注册页面组件
 * @component
 * @description 提供用户注册功能，包含用户名、邮箱和密码的表单验证
 * @returns {JSX.Element} 注册页面组件
 */
export default function RegisterPage(): React.ReactElement {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('两次输入的密码不一致')
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || '注册失败')
      }

      toast({
        title: "注册成功",
        description: "正在跳转到登录页面...",
      })

      router.push('/login')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "注册失败",
        description: error instanceof Error ? error.message : '发生未知错误',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">注册账号</h1>
          <p className="mt-2 text-sm text-gray-600">
            已有账号？
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              立即登录
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="用户名"
                required
                minLength={3}
                maxLength={20}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full"
              />
            </div>
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
            <div>
              <Input
                type="password"
                placeholder="确认密码"
                required
                minLength={6}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? '注册中...' : '注册'}
          </Button>
        </form>
      </div>
    </div>
  )
}