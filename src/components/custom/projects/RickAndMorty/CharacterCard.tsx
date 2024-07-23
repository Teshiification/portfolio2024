import { Glow, GlowCapture } from '@codaworks/react-glow'
import { AtomIcon, GlobeIcon, HomeIcon } from 'lucide-react'
import Image from 'next/image'
import type { FC } from 'react'
import { FaGenderless } from 'react-icons/fa'
import { IoMdFemale, IoMdMale } from 'react-icons/io'

import { cn } from '@/lib/utils'
import type { Location } from '@/types/rickandmorty/location'
import type { Character } from '@/types/rickandmorty/people'

import { Card } from '@/components/ui/card'

export interface CharacterCardProps {
  characterData: Character
  locationData: Location
}

export const CharacterCard: FC<CharacterCardProps> = ({
  characterData,
  locationData
}) => {
  return (
    <GlowCapture>
      <Glow
        color={
          characterData.gender.toLowerCase() === 'male' ? 'green' : 'purple'
        }
      >
        <Card
          className={cn(
            characterData.gender.toLowerCase() === 'male'
              ? 'glow:bg-green-900/40'
              : 'glow:bg-purple-900/40',
            characterData.gender.toLowerCase() === 'male'
              ? 'shadow-green-500/40'
              : 'shadow-purple-500/40',
            'glow:text-glow/10 bg-card text-card-foreground flex w-full select-none flex-col items-center space-y-4 pb-4 shadow-2xl'
          )}
        >
          <Image
            src={characterData.image}
            alt='portrait'
            width={600}
            height={600}
            className='object-cover transition-all duration-300 ease-in-out group-hover:scale-105 md:rounded-lg'
          />
          <h1 className='text-2xl font-semibold'>{`#${characterData.id} ${characterData.name}`}</h1>
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
        </Card>
      </Glow>
    </GlowCapture>
  )
}
