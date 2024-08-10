import { ClockIcon, GithubIcon, LinkedinIcon } from 'lucide-react'
import Link from 'next/link'

import ProjectsPage from '@/components/custom/projects/ProjectsCarousel'
import { ImagePrisma } from '@/components/custom/ui/ImagePrisma'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'

export default function Home() {
  const birthdayDate = new Date('04.04.1998')
  const dateNow = new Date()

  return (
    <main className='flex h-screen w-full snap-y  snap-mandatory flex-col items-center overflow-y-scroll'>
      <section className='flex min-h-screen w-full snap-start flex-col items-center justify-center gap-40 bg-gradient-to-b from-primary/20 px-4 pt-20'>
        <div className='flex w-full flex-col items-center gap-8'>
          <h1 className='text-4xl font-bold'>Danny Sinicco</h1>
          <h2 className='font-semibold'>Welcome to my portfolio</h2>
        </div>

        <div className='flex flex-col items-center md:flex-row'>
          <ImagePrisma
            altText='test'
            imageUrl='/images/portraits/me_woodpanels.jpg'
          />
        </div>
      </section>

      <section className='flex min-h-screen w-full snap-start flex-col items-center justify-center gap-40 bg-gradient-to-t from-primary/20  px-4'>
        <Card className='flex flex-col p-10'>
          <CardHeader className='relative flex w-full flex-row items-center'>
            <h1 className='self-center text-2xl font-semibold uppercase underline decoration-primary underline-offset-2 md:mx-auto'>
              About me
            </h1>
            <div className='absolute right-0 flex gap-4 self-end'>
              <Link href='https://www.github.com/Teshiification'>
                <Button className='size-12' variant={'ghost'}>
                  <GithubIcon className='size-full' />
                </Button>
              </Link>
              <Link href='https://www.linkedin.com/in/danny-sinicco/'>
                <Button className='size-12' variant={'ghost'}>
                  <LinkedinIcon className='size-full' />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardDescription className='flex flex-col gap-4 p-2'>
            <div
              title={`Or just ${dateNow.getFullYear() - birthdayDate.getFullYear()}`}
              className='flex cursor-help items-center gap-2'
            >
              <ClockIcon className='size-4' />
              {(dateNow.getFullYear() - birthdayDate.getFullYear()).toString(2)}
              <p className='not-sr-only'>
                (or just {dateNow.getFullYear() - birthdayDate.getFullYear()})
              </p>
            </div>
            <p>
              ⚡ I started programming when I was 12 and I still have a lot to
              learn.
            </p>
            <p className='flex items-center gap-2'>
              <GithubIcon className='size-4' />
              Most of my projects are available at GitHub
            </p>
            <p>
              🌱 Current project: onlychill.org an open source project to track
              your personal or organizational data.
            </p>
          </CardDescription>
        </Card>
      </section>
      <section className='flex min-h-screen w-full snap-start flex-col items-center justify-center bg-gradient-to-b from-primary/20 px-4'>
        <ProjectsPage />
      </section>
    </main>
  )
}
