'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: '用户名至少2个字符.',
    })
    .max(30, {
      message: '用户名最多30个字符.',
    }),
  email: z.string().min(1, { message: '这是必填项' }).email('无效的邮箱地址'),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const formMessageStyles = 'text-xs text-red-500 absolute -top-1 right-0';

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: '已更新个人资料',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // ... existing code ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative pb-4">
              <div className="flex items-center justify-between">
                <FormLabel>用户名</FormLabel>
                <FormMessage className={formMessageStyles} />
              </div>
              <FormControl>
                <Input placeholder="输入用户名" {...field} />
              </FormControl>
              <FormDescription>这是你的公开显示名称。</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative pb-4">
              <div className="flex items-center justify-between">
                <FormLabel>邮箱</FormLabel>
                <FormMessage className={formMessageStyles} />
              </div>
              <FormControl>
                <Input placeholder="输入邮箱" {...field} />
              </FormControl>
              <FormDescription>用于接收通知的邮箱地址。</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="relative pb-4">
              <div className="flex items-center justify-between">
                <FormLabel>个人简介</FormLabel>
                <FormMessage className={formMessageStyles} />
              </div>
              <FormControl>
                <Textarea
                  placeholder="介绍一下你自己..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                你可以使用 @mentions 或 #hashtags
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">更新个人资料</Button>
      </form>
    </Form>
  );
}
