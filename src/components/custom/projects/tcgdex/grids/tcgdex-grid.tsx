'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Router, StepBackIcon } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import type { CardResume$1 } from '@/components/custom/projects/tcgdex/cards'
import {
  TcgDexCard,
  TcgDexDetailCard
} from '@/components/custom/projects/tcgdex/cards'
import { Button } from '@/components/ui/button'
import { useKeyDown, useOutsideClick } from '@/hooks'
import { useRouter } from 'next/navigation'

export const TcgDexGrid = ({
  data,
  className
}: {
  data?: Array<CardResume$1>
  className?: string
}) => {
  const [active, setActive] = useState<CardResume$1 | boolean | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [active])

  useKeyDown('Escape', () => setActive(null))
  useOutsideClick(ref, () => setActive(null))

  return (
    <div className={className}>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-background/40 backdrop-blur-sm'
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className='fixed inset-0 z-[100] grid place-items-center'>
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05
                }
              }}
              className='absolute right-2 top-2 flex size-6 items-center justify-center rounded-full lg:hidden'
              onClick={() => setActive(null)}
            />
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className='flex size-full max-w-[500px] flex-col overflow-hidden p-4 md:h-fit md:max-h-[90%]'
            >
              <TcgDexDetailCard
                data={active}
                id={id}
                setActive={setActive}
                className='flex size-full grow cursor-pointer flex-col'
              />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className='grid w-full grid-cols-1 items-center justify-center gap-4 overflow-y-scroll bg-gradient-to-b from-primary/20 p-2 pt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        <Button
className='transition-all hover:scale-110 border border-border rounded-none cursor-pointer duration-300 ease-in-out w-full md:h-[430px] md:w-[295px]'

          variant={'ghost'}
          onClick={()=> router.back()}
        >
          <StepBackIcon className='size-1/2' />
          <span className='text-lg font-semibold'>GO BACK TO OVERVIEW</span>
        </Button>
        {data?.map((card) => (
          <TcgDexCard key={card.id} data={card} id={id} setActive={setActive} />
        ))}
      </ul>
    </div>
  )
}