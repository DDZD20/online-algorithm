'use client';

import { SiteHeader } from "./site-header/site-header";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader/>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <ProgressBar
        height="2px"
        color="#8b5cf6"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  )
}