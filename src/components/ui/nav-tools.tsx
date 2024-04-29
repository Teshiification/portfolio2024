'use client'

import { useState } from 'react'
import { Button } from './button'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'
import { GitBranchIcon, GripVerticalIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'

export const NavTools = () => {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <div
      className={cn(
        'flex flex-col absolute top-4 right-4 z-50 transition-all ease-in-out duration-300 rounded-lg overflow-hidden',
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
          'flex flex-col space-y-1 items-center transition-all ease-in-out duration-300',
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
