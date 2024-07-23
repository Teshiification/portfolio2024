import {
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  HomeIcon
} from 'lucide-react'
import Link from 'next/link'

import { CharacterCard } from '@/components/custom/projects/RickAndMorty/CharacterCard'
import { Button } from '@/components/ui/button'
import type { Location } from '@/types/rickandmorty/location'
import { GET } from '@/types/rickandmorty/location'
import type { Character } from '@/types/rickandmorty/people'
import { Skeleton } from '@/components/ui/skeleton'

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

  if (!characterData)
    return (
      <Skeleton className='h-20 w-80 overflow-hidden text-center'>
        Loading...
      </Skeleton>
    )

  console.log(characterData.location.url)
  const locationData: Location = await GET(characterData.location.url)

  if (!locationData)
    return (
      <Skeleton className='h-20 w-80 overflow-hidden text-center'>
        Loading...
      </Skeleton>
    )

  return (
    <main className='flex flex-col items-center justify-between gap-4 overflow-hidden md:justify-center md:p-4'>
      <CharacterCard
        characterData={characterData}
        locationData={locationData}
      />
      <div className='flex h-fit w-full flex-row items-center justify-center gap-4 md:w-80'>
        <Button disabled={characterId <= 1} variant={'ghost'}>
          <Link href={'/rickandmorty/1'}>
            <ArrowLeftToLineIcon className='size-6' />
          </Link>
        </Button>
        <Button disabled={characterId <= 1} variant={'ghost'}>
          <Link href={`/rickandmorty/${characterId - 1}`}>
            <ArrowLeftIcon className='size-6' />
          </Link>
        </Button>
        <Link href={'/rickandmorty'}>
          <Button variant={'ghost'}>
            <HomeIcon className='size-6' />
          </Button>
        </Link>
        <Link href={`/rickandmorty/${1 + characterId}`}>
          <Button disabled={characterId >= 826} variant={'ghost'}>
            <ArrowRightIcon className='size-6' />
          </Button>
        </Link>
        <Link href={`/rickandmorty/${826}`}>
          <Button disabled={characterId >= 826} variant={'ghost'}>
            <ArrowRightToLineIcon className='size-6' />
          </Button>
        </Link>
      </div>
    </main>
  )
}
