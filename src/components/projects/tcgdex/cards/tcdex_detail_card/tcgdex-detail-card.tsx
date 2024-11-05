'use client'

import type { CardResume$1 } from '@tcgdex/sdk'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

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
      <CardContainer className="inter-var">
      <CardBody className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      {isLoading && <Skeleton className={`w-full md:h-[430px] md:w-[295px]`} />}
        <CardItem translateZ="100" className="w-full mt-4">
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
        </CardItem>
        
      </CardBody>
    </CardContainer>
      
    </motion.div>
  )
}
