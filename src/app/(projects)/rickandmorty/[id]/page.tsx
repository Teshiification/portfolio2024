import { CharacterCard } from '@/components/RickAndMorty/CharacterCard'
import { Button } from '@/components/ui/button'
import { GET, Location } from '@/types/rickandmorty/location'
import { Character } from '@/types/rickandmorty/people'
import {
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  HomeIcon
} from 'lucide-react'
import Link from 'next/link'

export default async function RickAndMortyCharacterPage({
  params
}: {
  params: any
}) {
  const { id } = params

  const characterId: number = Number(id)
  const characterData: Character = await fetch(
    `${process.env.RICKANDMORTY_API_KEY}/character/${characterId}`
  ).then((data) => data.json())
  console.log(characterData)

  if (!characterData) return <></>

  console.log(characterData.location.url)
  const locationData: Location = await GET(characterData.location.url)

  if (!locationData) return <></>

  return (
    <main className='p-4 flex flex-col gap-4 justify-center items-center h-screen w-screen overflow-hidden'>
      <div className='flex flex-row gap-4 w-80 items-center justify-center'>
        <Button disabled={characterId <= 1} variant={'ghost'}>
          <Link href={'/rickandmorty/1'}>
            <ArrowLeftToLineIcon className='size-6' />
          </Link>
        </Button>
        <Button disabled={characterId <= 1} variant={'ghost'}>
          <Link href={'/rickandmorty/' + (characterId - 1)}>
            <ArrowLeftIcon className='size-6' />
          </Link>
        </Button>
        <Link href={'/rickandmorty'}>
          <Button variant={'ghost'}>
            <HomeIcon className='size-6' />
          </Button>
        </Link>
        <Link href={'/rickandmorty/' + (1 + characterId)}>
          <Button disabled={characterId >= 826} variant={'ghost'}>
            <ArrowRightIcon className='size-6' />
          </Button>
        </Link>
        <Link href={'/rickandmorty/' + 826}>
          <Button disabled={characterId >= 826} variant={'ghost'}>
            <ArrowRightToLineIcon className='size-6' />
          </Button>
        </Link>
      </div>
      <CharacterCard
        characterData={characterData}
        locationData={locationData}
      />
    </main>
  )
}
