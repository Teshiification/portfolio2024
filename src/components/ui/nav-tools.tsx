'use client'

import {
  GithubIcon,
  GripVerticalIcon,
  HomeIcon,
  InfoIcon,
  LinkedinIcon,
  SidebarCloseIcon
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'


import { Button } from './button'
import { Separator } from './separator'
import { ThemeToggle } from './theme-toggle'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet'

export const NavTools = () => {

  return (
    <TooltipProvider>

<Sheet>
      <SheetTrigger asChild>
      <Button
          variant={'default'}
          className='fixed right-4 top-4 z-50'
        >
          <GripVerticalIcon className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Some quicklinks to navigate through this website!
          </SheetDescription>
        </SheetHeader>
        
        <div
          className={
            'flex flex-col gap-4 size-full items-center'
          }
        >
          <Tooltip>
            <TooltipTrigger
            className='w-full'>
              <Link href='/'>
                <Button
                  variant={'ghost'}
                  className='w-full gap-4'>
                  <p className='not-sr-only'>Home</p>
                  <HomeIcon className='size-4 ' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger
            className='w-full'>
              <ThemeToggle className='w-full' />
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger
            className='w-full'>
              <Link href='https://www.github.com/Teshiification'>
                <Button
                  variant={'ghost'}
                  className='w-full gap-4'
                >
                  <p className='not-sr-only'>Github</p>
                  <GithubIcon className='size-4' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Github</TooltipContent>
          </Tooltip>
          <Separator className='bg-secondary' />
          <Tooltip>
            <TooltipTrigger
            className='w-full'>
              <Link href='https://www.linkedin.com/in/danny-sinicco/'>
                <Button
                  variant={'ghost'}
                  className='w-full gap-4'
                >
                  <p className='not-sr-only'>Linkedin</p>
                  <LinkedinIcon className='size-4' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Linkedin</TooltipContent>
          </Tooltip>
        
        </div>
        <SheetFooter className='flex items-center gap-4'>
        <Tooltip>
            <TooltipTrigger
            className='w-fit'>
              <Link href='/impressum'>
                <Button
                  variant={'ghost'}
                  className='flex gap-4 w-fit'
                >
                  <p>Impressum</p>
                  <InfoIcon className='size-4' />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Impressum</TooltipContent>
          </Tooltip>
         <p className='text-xs'> {`© Danny Sinicco 2020 - ` +new Date().getFullYear()}</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </TooltipProvider>

   
  )
}
