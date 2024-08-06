import {
  ArrowLeftIcon,
  ArrowLeftToLineIcon,
  ArrowRightIcon,
  ArrowRightToLineIcon,
  AtomIcon,
  GlobeIcon,
  HomeIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGenderless } from 'react-icons/fa'
import { IoMdFemale, IoMdMale } from 'react-icons/io'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Location } from '@/types/rickandmorty/location'
import { GET } from '@/types/rickandmorty/location'
import type { Character } from '@/types/rickandmorty/people'

export default async function RickAndMortyCharacterPage({
  params
}: {
  params: { id: number }
}) {
  const { id } = params

  const characterId: number = id
  const characterData: Character = await fetch(
    `https://rickandmortyapi.com/api/character/${characterId}`
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
    <main className='flex h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden bg-lime-950 md:justify-center md:p-4'>
      <Image
        src={characterData.image}
        alt='portraitbackground'
        width={600}
        height={600}
        className='absolute right-0 z-0 size-full object-cover blur-md'
      />
      <Card className='absolute z-20 flex h-80 flex-col items-center gap-10 bg-opacity-20 backdrop-blur-sm md:size-1/2'>
        <CardHeader className='relative flex w-full items-center'>
          <Image
            src={characterData.image}
            alt='portrait'
            width={600}
            height={600}
            className='absolute left-4 top-4 size-40 rounded-full object-cover'
          />
          <h1 className='text-2xl font-semibold'>{`#${characterData.id} ${characterData.name}`}</h1>
        </CardHeader>
        <CardContent className='w-full md:w-fit'>
          <p className='flex flex-row items-center gap-4'>
            {
              // eslint-disable-next-line no-nested-ternary
              characterData.gender.toLowerCase() === 'male' ? (
                <IoMdMale
                  className='size-4 cursor-help'
                  title={characterData.gender}
                />
              ) : characterData.gender.toLowerCase() === 'female' ? (
                <IoMdFemale
                  className='size-4 cursor-help'
                  title={characterData.gender}
                />
              ) : (
                <FaGenderless
                  className='size-4 cursor-help'
                  title={characterData.gender}
                />
              )
            }
            <p className='cursor-help' title={characterData.species}>
              {characterData.species}
            </p>
          </p>
          <p>{`Episodes: ${characterData.episode.length}`}</p>
          <div>
            <div
              className='flex cursor-help items-center gap-2'
              title='Location'
            >
              <GlobeIcon className='size-4' />
              <h2 className='text-xl'>{`${locationData.name}`}</h2>
            </div>
            <div
              className='flex cursor-help items-center gap-2'
              title='Home Type'
            >
              <HomeIcon className='size-4' />
              <p>{locationData.type}</p>
            </div>
            <div
              className='flex cursor-help items-center gap-2'
              title='Dimension'
            >
              <AtomIcon className='size-4' />
              <p>{locationData.dimension}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='fixed bottom-0 mr-2 flex w-full flex-row items-center justify-center gap-4 text-primary'>
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
      </Card>
    </main>
  )
}
