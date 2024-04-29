import { Glow, GlowCapture } from '@codaworks/react-glow'
import { Card } from '../ui/card'
import Image from 'next/image'
import { IoMdFemale, IoMdMale, IoMdQuote } from 'react-icons/io'
import { Character } from '@/types/rickandmorty/people'
import { FC } from 'react'
import { Location } from '@/types/rickandmorty/location'
import { cn } from '@/lib/utils'
import { AtomIcon, GlobeIcon, HomeIcon } from 'lucide-react'
import { IoHelp } from 'react-icons/io5'
import { FaGenderless } from 'react-icons/fa'

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
            'shadow-2xl select-none pb-4 glow:text-glow/10 bg-card text-card-foreground relative flex flex-col space-y-4 items-center'
          )}
        >
          <Image
            src={characterData.image}
            alt='image'
            width={600}
            height={600}
            className='object-cover rounded-t-lg'
          />
          <h1 className='text-2xl font-semibold'>{`#${characterData.id} ${characterData.name}`}</h1>
          <p className='flex flex-row gap-4 items-center'>
            {characterData.gender.toLowerCase() === 'male' ? (
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
            )}
            <p className='cursor-help' title={characterData.species}>
              {characterData.species}
            </p>
          </p>
          <p>{`Episodes: ${characterData.episode.length}`}</p>
          <div>
            <div
              className='flex items-center gap-2 cursor-help'
              title='Location'
            >
              <GlobeIcon className='size-4' />
              <h2 className='text-xl'>{`${locationData.name}`}</h2>
            </div>
            <div
              className='flex items-center gap-2 cursor-help'
              title='Home Type'
            >
              <HomeIcon className='size-4' />
              <p>{locationData.type}</p>
            </div>
            <div
              className='flex items-center gap-2 cursor-help'
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
