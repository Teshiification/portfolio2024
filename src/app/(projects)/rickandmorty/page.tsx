'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { CharacterOverviewCard } from '@/components/RickAndMorty/CharacterOverviewCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Character } from '@/types/rickandmorty/people'

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
    <main className='flex h-screen w-full flex-col items-center overflow-hidden md:p-20'>
      <div className='flex size-full flex-wrap gap-4 overflow-y-auto overflow-x-hidden'>
        {fetchData.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>

      <div className='relative flex w-full flex-row items-center justify-center gap-4 md:w-80'>
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
      </div>
    </main>
  )
}
