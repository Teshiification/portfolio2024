'use client'

import { GitBranchIcon, GripVerticalIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { ThemeToggle } from './theme-toggle'

export const NavTools = () => {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div
      className={cn(
        'absolute right-4 top-4 z-50 flex flex-col overflow-hidden rounded-lg transition-all duration-300 ease-in-out',
        expand ? 'bg-background' : 'bg-transparent'
      )}
    >
      <Button
        variant={'default'}
        onClick={() => {
          setExpand(!expand)
        }}
      >
        <GripVerticalIcon className='size-4' />
      </Button>
      <div
        className={cn(
          'flex flex-col items-center space-y-1 transition-all duration-300 ease-in-out',
          expand ? 'visible size-full' : 'hidden size-4'
        )}
      >
        <Button variant={'ghost'}>
          <Link href='/'>
            <HomeIcon className='size-4' />
          </Link>
        </Button>
        <ThemeToggle />
        <Button variant={'ghost'}>
          <GitBranchIcon className='size-4' />
        </Button>
      </div>
    </div>
  )
}