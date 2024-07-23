'use client'

import { ArrowLeftIcon, ArrowRightIcon, FilmIcon, HomeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { CharacterOverviewCard } from '@/components/custom/projects/RickAndMorty/CharacterOverviewCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Character } from '@/types/rickandmorty/people'
import { EpisodesChart } from '@/components/custom/projects/RickAndMorty/Charts/EpisodesChart'
import { SpeciesChart } from '@/components/custom/projects/RickAndMorty/Charts/SpeciesChart'
import { Card } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function RickAndMortyCharactersPage() {
  const [fetchData, setFetchData] = useState<{
    info: {
      count: number
      pages: number
      next: string | null
      prev: string | null
    }
    results: Character[]
  }>({ info: { count: 0, next: null, pages: 0, prev: null }, results: [] })

  const [fetchUrl, setFetchUrl] = useState<string>(
    `https://rickandmortyapi.com/api/character`
  )

  const [page, setPage] = useState<Number>(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch data${fetchUrl}`)
        }
        const data = await response.json()
        setFetchData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [fetchUrl])

  if (!fetchData || !fetchData.results)
    return (
      <Skeleton className='h-20 w-80 overflow-hidden text-center'>
        Loading...
      </Skeleton>
    )

  return (
    <ScrollArea className='mt-12 flex w-full flex-col items-center justify-center'>
      <div className='flex flex-col pr-4 md:flex-row md:pr-0'>
        <EpisodesChart data={fetchData.results as Character[]} />
        <SpeciesChart data={fetchData.results as Character[]} />
      </div>
      <Separator className='my-10' />
      <div className='flex w-full flex-wrap items-center justify-center gap-8 pb-20'>
        {fetchData.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>

      <Card className='text-primary fixed bottom-0 flex w-full flex-row items-center justify-center gap-4'>
        <Button
          disabled={!fetchData.info.prev}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchData.info.prev || '')
            setPage(Number(page) - 1)
          }}
        >
          <ArrowLeftIcon className='size-6' />
        </Button>
        <Link href={'/'}>
          <Button variant={'ghost'}>
            <HomeIcon />
          </Button>
        </Link>
        <Button
          disabled={!fetchData.info.next}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchData.info.next || '')
            setPage(Number(page) + 1)
          }}
        >
          <ArrowRightIcon className='size-6' />
        </Button>
        <p className='absolute right-2'>
          {page.toString()}/{fetchData.info.pages}
        </p>
      </Card>
    </ScrollArea>
  )
}
