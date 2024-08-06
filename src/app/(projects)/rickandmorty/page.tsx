import {
  CharacterOverviewCard,
  EpisodesChart,
  Pagination,
  SpeciesChart
} from '@/components'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import type { Character } from '@/types/rickandmorty/people'

export default async function RickAndMortyCharactersPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams?.page) || 1

  async function fetchData() {
    try {
      const url = `${process.env.RICKANDMORTY_API_URL}/character/?page=${page}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${url}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return null
    }
  }

  const data: {
    info: {
      count: number
      pages: number
      next: string | null
      prev: string | null
    }
    results: Character[]
  } = await fetchData()

  if (!data) {
    return <div>Error loading data</div>
  }

  return (
    <ScrollArea className='mt-24 flex w-full flex-col items-center justify-center'>
      <div className='flex flex-col pr-4 md:flex-row md:pr-0'>
        <EpisodesChart data={data.results} />
        <SpeciesChart data={data.results} />
      </div>
      <Separator className='my-10' />
      <div className='flex w-full flex-wrap items-center justify-center gap-8 pb-20'>
        {data.results.map((characterData: Character, index: number) => (
          <CharacterOverviewCard key={index} characterData={characterData} />
        ))}
      </div>
      <Pagination page={page} info={data.info} />
    </ScrollArea>
  )
}
