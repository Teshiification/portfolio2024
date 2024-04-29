import { Glow, GlowCapture } from '@codaworks/react-glow'
import { Card } from '../ui/card'
import Image from 'next/image'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import { Character } from '@/types/rickandmorty/people'
import { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface CharacterOverviewCardProps {
  characterData: Character
}

export const CharacterOverviewCard: FC<CharacterOverviewCardProps> = ({
  characterData
}) => {
  return (
    <Card
      className={cn(
        characterData.gender.toLowerCase() === 'male'
          ? 'shadow-green-500/40'
          : characterData.gender.toLowerCase() === 'female'
            ? 'shadow-purple-500/40'
            : 'shadow-yellow-500/40',
        'group relative w-80 h-80 text-card-foreground overflow-hidden shadow-lg transition-all ease-in-out duration-300'
      )}
    >
      <Link href={'/rickandmorty/' + characterData.id}>
        <Image
          src={characterData.image}
          alt='image'
          width={500}
          height={500}
          className='w-80 h-80 object-cover rounded-lg group-hover:scale-105 transition-all ease-in-out duration-300'
        />
        <h1 className='w-full py-1 absolute text-center font-semibold bg-card/60 group-hover:bg-card/80 bottom-0 text-card-foreground transition-all ease-in-out duration-300'>
          {characterData.name}
        </h1>
      </Link>
    </Card>
  )
}
