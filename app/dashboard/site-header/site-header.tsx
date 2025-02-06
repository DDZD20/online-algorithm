"use client"

import Link from 'next/link';
import { ModeToggle } from '@/app/dashboard/site-header/mode-toggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

export function SiteHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center transition-all duration-300 ease-in-out">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">MeetCode</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              Docs
            </Link>
            <Link
              href="/components"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              Components
            </Link>
            <Link
              href="/themes"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              Themes
            </Link>
            <Link
              href="/examples"
              className="text-foreground transition-colors hover:text-foreground/80"
            >
              Examples
            </Link>
            <Link
              href="/github"
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
            >
              GitHub
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">
                Search documentation...
              </span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
          <div>
            <Avatar>
              <AvatarImage onClick={() => {
                router.push('/dashboard/profile');
              }} src="/cat.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

