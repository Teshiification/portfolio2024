'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Character } from '@/types/rickandmorty/people'

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
        'text-primary group relative w-screen overflow-hidden shadow-lg transition-all duration-300 ease-in-out md:size-80'
      )}
    >
      <Link href={`/rickandmorty/${characterData.id}`} prefetch>
        <Image
          src={characterData.image}
          alt='image'
          width={600}
          height={600}
          className='w-full rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:scale-105 md:size-80'
        />
        <h1 className='absolute bottom-0 w-full bg-card/80 py-1 text-center font-semibold text-primary transition-all duration-300 ease-in-out group-hover:bg-card/80'>
          {characterData.name}
        </h1>
      </Link>
    </Card>
  )
}
