'use client'

import type { CardResume$1 } from '@tcgdex/sdk'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type TcgDexCardProps = {
  className?: string
  id?: string
  setActive?: any
  data: CardResume$1
}

export const TcgDexCard = ({
  data,
  id,
  setActive,
  className
}: TcgDexCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <motion.div
      layoutId={`card-${data.id}-${id}`}
      className={cn('relative', className)}
    >
      {isLoading && <Skeleton className={`w-full md:h-[430px] md:w-[295px]`} />}{' '}
      <Image
        id={id}
        onClick={() => setActive(data)}
        src={data?.image ? `${data.image}/low.png` : ''}
        alt={data?.id || ''}
        width={200}
        height={200}
        className={cn(
          `transition-opacity cursor-zoom-in duration-300 ease-in-out w-full md:h-[430px] md:w-[295px]`,
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </motion.div>
  )
}
