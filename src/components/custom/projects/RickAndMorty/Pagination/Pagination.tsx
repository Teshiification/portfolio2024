'use client'

import {
  ArrowLeftFromLineIcon,
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  HomeIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  if (!info) return <Skeleton className='fixed bottom-0 mr-2  w-full' />

  return (
    <Card className='fixed bottom-0 mr-2 flex w-full flex-row items-center justify-center gap-4 text-primary'>
      <Button
        disabled={!info.prev}
        variant={'ghost'}
        onClick={() => {
          router.push(`/rickandmorty?page=1`)
        }}
      >
        <ArrowLeftToLineIcon />
      </Button>
      <Button
        disabled={!info.prev}
        variant={'ghost'}
        onClick={() => {
          router.push(`/rickandmorty?page=${(page - 1).toString()}`)
        }}
      >
        <ArrowLeftIcon className='size-6' />
      </Button>

      <Button
        disabled={!info.next}
        variant={'ghost'}
        onClick={() => {
          router.push(`/rickandmorty?page=${(page + 1).toString()}`)
        }}
      >
        <ArrowRightIcon className='size-6' />
      </Button>
      <Button
        disabled={!info.next}
        variant={'ghost'}
        onClick={() => {
          router.push(`/rickandmorty?page=${info.pages.toString()}`)
        }}
      >
        <ArrowRightToLineIcon />
      </Button>
      <p className='absolute right-2'>
        {page}/{info.pages}
      </p>
    </Card>
  )
}
