'use server'

import Image from 'next/image'

import { cn } from '@/lib/utils'

// Function to generate a random integer within a range
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const Ivy = (index: number) => {
  // Generate random rotation between -45 and 45 degrees
  const rotation = getRandomInt(0, 360)

  // Generate random top offset
  const topOffset = getRandomInt(0, 80) // Adjust the range as needed

  // Generate random size
  const randomSize = getRandomInt(100, 300) // Adjust the range for size as needed

  return (
    <Image
      src={'/images/plants/english-ivy.png'}
      alt=''
      width={100}
      height={100}
      className={cn('absolute overflow-visible object-cover')}
      style={{
        top: `${index * 2 + topOffset}%`,
        transform: `rotate(${rotation}deg)`,
        scale: randomSize / 100
      }}
    />
  )
}
