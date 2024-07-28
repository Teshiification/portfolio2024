'use client'

import {
  GithubIcon,
  GripVerticalIcon,
  HomeIcon,
  InfoIcon,
  LinkedinIcon
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Card } from './card'
import { Separator } from './separator'
import { ThemeToggle } from './theme-toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'

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
      <TooltipProvider>
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
          <Tooltip>
            <TooltipTrigger>
              <Link href='/'>
                <Button
                  variant={'ghost'}
                  className='rounded-none hover:bg-primary/10'
                >
                  <HomeIcon className='size-4 ' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger>
              <ThemeToggle className='hover:bg-primary/10' />
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger>
              <Link href='https://www.github.com/Teshiification'>
                <Button
                  variant={'ghost'}
                  className='rounded-none hover:bg-primary/10'
                >
                  <GithubIcon className='size-4' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Github</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger>
              <Link href='https://www.linkedin.com/in/danny-sinicco/'>
                <Button
                  variant={'ghost'}
                  className='rounded-none hover:bg-primary/10'
                >
                  <LinkedinIcon className='size-4' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Linkedin</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Link href='/impressum'>
                <Button
                  variant={'ghost'}
                  className='flex gap-2 rounded-none hover:bg-primary/10'
                >
                  <InfoIcon className='size-4' />
                  <p>Impressum</p>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Impressum</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Card>
  )
}
