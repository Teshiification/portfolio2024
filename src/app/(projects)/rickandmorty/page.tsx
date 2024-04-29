'use client'
import { CharacterOverviewCard } from '@/components/RickAndMorty/CharacterOverviewCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Character } from '@/types/rickandmorty/people'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          throw new Error('Failed to fetch data' + fetchUrl)
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
    <main className='p-20 flex flex-col h-screen w-screen overflow-hidden items-center'>
      <div className='gap-4 place-items-stretch flex flex-wrap w-full h-full overflow-x-hidden overflow-y-auto items-stretch'>
        {fetchData.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>

      <div className='flex flex-row gap-4 w-80 items-center justify-center'>
        <Button
          disabled={!fetchData.info.prev}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchData.info.prev || '')
          }}
        >
          <ArrowLeftIcon className='size-6' />
        </Button>
        <Button
          disabled={!fetchData.info.next}
          variant={'ghost'}
          onClick={() => {
            setFetchUrl(fetchData.info.next || '')
          }}
        >
          <ArrowRightIcon className='size-6' />
        </Button>
      </div>
    </main>
  )
}
