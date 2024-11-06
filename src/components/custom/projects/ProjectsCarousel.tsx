'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export const ProjectsCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <Carousel
      // @ts-ignore
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className='w-full md:max-w-screen-2xl'
    >
      <CarouselContent className='md:aspect-video'>
        <CarouselItem>
          <Link href='/rickandmorty' prefetch>
            <Card className='relative size-full overflow-hidden'>
              <Image
                src='/images/rick-and-morty-portal.jpg'
                alt=''
                className='absolute z-0 size-full object-cover opacity-90 dark:opacity-20'
                width={1920}
                height={1080}
              />
              <CardHeader className='absolute z-10 w-full bg-background/10 text-primary-foreground'>
                <h2 className='text-2xl font-semibold'>Rickdex</h2>
              </CardHeader>
              <CardContent className='absolute z-10 flex size-full flex-col justify-around bg-background/10'>
                <p className='text-justify md:w-80'>
                  Introducing the ultimate Rick and Morty companion tool: the
                  &quot;Rickdex&quot;. Imagine a sleek, user-friendly interface
                  similar to a Pokédex, but designed specifically for fans of
                  the intergalactic adventures of Rick Sanchez and his hapless
                  grandson, Morty. The Rickdex makes exploring the show&apos;s
                  vast multiverse a breeze.
                </p>
                <div className='flex w-full flex-row items-center justify-between'>
                  <Button variant={'outline'}>Go to Rickdex</Button>
                  <Link
                    href='https://rickandmortyapi.com'
                    className='italic underline decoration-primary underline-offset-2 opacity-40 hover:opacity-100'
                  >
                    api src: rickandmortyapi.com
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link href='/tcgdex' prefetch>
            <Card className='relative size-full overflow-hidden'>
              <Image
                src='/images/tcgdex.jpg'
                alt=''
                className='absolute z-0 size-full object-cover opacity-90 dark:opacity-20'
                width={1920}
                height={1080}
              />
              <CardHeader className='absolute z-10 flex w-full bg-background/10 text-primary-foreground'>
                <h2 className='z-10 self-end text-2xl font-semibold'>TCGDex</h2>
              </CardHeader>
              <CardContent className='absolute z-10 flex size-full flex-col justify-around bg-background/10'>
                <p className='self-end text-justify md:w-80'>
                  Imagine a sleek, user-friendly device designed to help
                  Trainers explore the vast world of Pokémon. The Pokédex makes
                  discovering and learning about every Pokémon species a breeze!
                </p>
                <div className='flex w-full flex-row items-center justify-between'>
                  <Link
                    href='https://tcgdex.dev'
                    className='italic underline decoration-primary underline-offset-2 opacity-40 hover:opacity-100'
                  >
                    api src: tcgdex.dev
                  </Link>
                  <Button variant={'outline'}>Go to TCGDex</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
