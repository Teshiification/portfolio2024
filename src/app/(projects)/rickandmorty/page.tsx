'use client'

import { useEffect, useState } from 'react'

import {
  CharacterOverviewCard,
  EpisodesChart,
  SpeciesChart
} from '@/components/custom/projects/RickAndMorty'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Character } from '@/types/rickandmorty/people'

export default function RickAndMortyPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  // Extract page number from searchParams and default to 1 if not provided
  const page = parseInt(searchParams.page || '1', 10)

  async function fetchData() {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`
    console.log(url)
    try {
      const response = await fetch(url, {
        next: { revalidate: 10 }
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Fetch data error:', error)
      return null
    }
  }

  const [data, setData] = useState<{
    info: {
      count: number
      pages: number
      next: string | null
      prev: string | null
    }
    results: Character[]
  } | null>(null)

  useEffect(() => {
    fetchData().then((d) => {
      setData(d)
    })
  }, [page])

  return (
    <ScrollArea className='mt-24 flex w-full flex-col items-center justify-center'>
      <div className='flex flex-col pr-4 md:flex-row md:pr-0'>
        <EpisodesChart data={data?.results} />
        <SpeciesChart data={data?.results} />
      </div>
      <Separator className='my-10' />
      <div className='flex w-full flex-wrap items-center justify-center gap-8 pb-20'>
        {data?.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>
      {/* <Pagination page={page} info={data?.info} /> */}
    </ScrollArea>
  )
}
