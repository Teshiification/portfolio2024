'use client'

import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import Router from 'next/router'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const Pagination = ({
  page,
  info
}: {
  page: number
  info?: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!info) return <Skeleton className='fixed bottom-0 mr-2  w-full' />

  return (
    <Card className='fixed bottom-0 mr-2 flex w-full flex-row items-center justify-center gap-4 text-primary'>
      <Button
        disabled={!info.prev}
        variant={'ghost'}
        onClick={() => {
          scrollToTop()
          Router.push({
            pathname: '/rickandmorty',
            query: { page: page - 1 }
          })
        }}
      >
        <ArrowLeftIcon className='size-6' />
      </Button>
      <Link href={'/'} prefetch>
        <Button variant={'ghost'}>
          <HomeIcon />
        </Button>
      </Link>
      <Button
        disabled={!info.next}
        variant={'ghost'}
        onClick={() => {
          scrollToTop()
          Router.push({
            pathname: '/rickandmorty',
            query: { page: page + 1 }
          })
        }}
      >
        <ArrowRightIcon className='size-6' />
      </Button>
      <p className='absolute right-2'>
        {page.toString()}/{info.pages}
      </p>
    </Card>
  )
}
