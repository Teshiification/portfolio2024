'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface CardResume$1 {
  id: string
  localId: string

  /**
   * Card Name (Including the suffix if next to card name)
   */
  name: string
  image?: string
}

type TcgDexDetailCardProps = {
  className?: string
  id?: string
  setActive?: any
  data: CardResume$1
}

export const TcgDexDetailCard = ({
  data,
  id,
  setActive,
  className
}: TcgDexDetailCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <motion.div
      layoutId={`card-${data.id}-${id}`}
      className={cn('relative', className)}
    >
      <div className='sr-only'>
        {isLoading && <Skeleton className={`size-full`} />}
        <Image
          id={id}
          src={`${data.image}/high.png`}
          alt={data.id || ''}
          width={200}
          height={200}
          className={cn(
            `transition-opacity cursor-zoom-out duration-300 ease-in-out w-full md:h-[430px] md:w-[295px]`,
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          priority
          onLoadingComplete={() => setIsLoading(false)}
          onClick={() => setActive(null)}
        />
      </div>
      <CardContainer
        className='inter-var not-sr-only items-center justify-center'
        containerClassName='items-center justify-center'
      >
        <CardBody className='group/card relative size-fit rounded-xl border border-black/[0.1] p-20 dark:border-white/[0.2] dark:bg-transparent dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]'>
          <CardItem translateZ='100'>
            {isLoading && <Skeleton className={`h-[430px] w-[295px]`} />}
            <Image
              id={id}
              src={`${data.image}/high.png`}
              alt={data.id || ''}
              width={200}
              height={200}
              className={cn(
                `transition-opacity cursor-zoom-out duration-300 ease-in-out w-full md:h-[430px] md:w-[295px]`,
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              hidden={isLoading}
              priority
              onLoadingComplete={() => setIsLoading(false)}
              onClick={() => setActive(null)}
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  )
}
