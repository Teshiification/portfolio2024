'use client'

import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CharacterOverviewCard } from '@/components/custom/projects/RickAndMorty/CharacterOverviewCard'
import { EpisodesChart } from '@/components/custom/projects/RickAndMorty/Charts/EpisodesChart'
import { SpeciesChart } from '@/components/custom/projects/RickAndMorty/Charts/SpeciesChart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type { Character } from '@/types/rickandmorty/people'

export default function RickAndMortyCharactersPage() {
  const [fetchedData, setFetchedData] = useState<{
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
        setFetchedData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [fetchUrl])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This will animate the scroll
    })
  }

  if (!fetchedData || !fetchedData.results)
    return (
      <Skeleton className='h-20 w-80 overflow-hidden text-center'>
        Loading...
      </Skeleton>
    )

  return (
    <ScrollArea className='mt-24 flex w-full flex-col items-center justify-center'>
      <div className='flex flex-col pr-4 md:flex-row md:pr-0'>
        <EpisodesChart data={fetchedData.results as Character[]} />
        <SpeciesChart data={fetchedData.results as Character[]} />
      </div>
      <Separator className='my-10' />
      <div className='flex w-full flex-wrap items-center justify-center gap-8 pb-20'>
        {fetchedData.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>

      <Card className='fixed bottom-0 mr-2 flex w-full flex-row items-center justify-center gap-4 text-primary'>
        <Button
          disabled={!fetchedData.info.prev}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchedData.info.prev || '')
            setPage(Number(page) - 1)
            scrollToTop()
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
          disabled={!fetchedData.info.next}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchedData.info.next || '')
            setPage(Number(page) + 1)
            scrollToTop()
          }}
        >
          <ArrowRightIcon className='size-6' />
        </Button>
        <p className='absolute right-2'>
          {page.toString()}/{fetchedData.info.pages}
        </p>
      </Card>
    </ScrollArea>
  )
}
