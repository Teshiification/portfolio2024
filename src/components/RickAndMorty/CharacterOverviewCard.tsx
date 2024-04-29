import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/lib/utils'
import type { Character } from '@/types/rickandmorty/people'

import { Card } from '../ui/card'

export interface CharacterOverviewCardProps {
  characterData: Character
}

export const CharacterOverviewCard: FC<CharacterOverviewCardProps> = ({
  characterData
}) => {
  return (
    <Card
      className={cn(
        // eslint-disable-next-line no-nested-ternary
        characterData.gender.toLowerCase() === 'male'
          ? 'shadow-green-500/40'
          : characterData.gender.toLowerCase() === 'female'
            ? 'shadow-purple-500/40'
            : 'shadow-yellow-500/40',
        'text-card-foreground group relative size-80 overflow-hidden shadow-lg transition-all duration-300 ease-in-out'
      )}
    >
      <Link href={`/rickandmorty/${characterData.id}`}>
        <Image
          src={characterData.image}
          alt='image'
          width={500}
          height={500}
          className='size-80 rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:scale-105'
        />
        <h1 className='bg-card/60 text-card-foreground group-hover:bg-card/80 absolute bottom-0 w-full py-1 text-center font-semibold transition-all duration-300 ease-in-out'>
          {characterData.name}
        </h1>
      </Link>
    </Card>
  )
}
