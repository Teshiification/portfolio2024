'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn(className)}
    >
      <p className='not-sr-only mr-4 capitalize'>
        {theme === 'light' ? 'dark' : 'light'}
      </p>
      <Sun className='size-4 dark:hidden' />
      <Moon className='hidden size-4 dark:block' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
