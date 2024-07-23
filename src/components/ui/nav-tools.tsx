'use client'

import {
  GithubIcon,
  GripVerticalIcon,
  HomeIcon,
  LinkedinIcon
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { ThemeToggle } from './theme-toggle'
import { Card } from './card'
import { Separator } from './separator'

export const NavTools = ({ className }: { className?: string }) => {
  const [expand, setExpand] = useState<boolean>(false)

  return (
    <Card
      className={cn(
        'fixed right-4 top-4 z-50 flex size-fit flex-col overflow-hidden transition-all duration-300 ease-in-out',
        expand ? 'bg-background' : 'bg-transparent',
        className
      )}
    >
      <Button
        variant={'default'}
        onClick={() => {
          setExpand(!expand)
        }}
        className={expand ? 'rounded-b-none' : 'rounded-b-lg'}
      >
        <GripVerticalIcon className='size-4' />
      </Button>
      <div
        className={cn(
          'flex flex-col items-center transition-all duration-300 ease-in-out',
          expand ? 'visible' : 'hidden'
        )}
      >
        <Link href='/'>
          <Button
            variant={'ghost'}
            className='hover:bg-primary/10 rounded-none'
          >
            <HomeIcon className='size-4 ' />
          </Button>
        </Link>
        <Separator className='bg-secondary' />
        <ThemeToggle className='hover:bg-primary/10' />
        <Separator className='bg-secondary' />
        <Link href='https://www.github.com/Teshiification'>
          <Button
            variant={'ghost'}
            className='hover:bg-primary/10 rounded-none'
          >
            <GithubIcon className='size-4' />
          </Button>
        </Link>
        <Separator className='bg-secondary' />
        <Link href='https://www.linkedin.com/in/danny-sinicco/'>
          <Button
            variant={'ghost'}
            className='hover:bg-primary/10 rounded-none'
          >
            <LinkedinIcon className='size-4' />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
