import Image from 'next/image'
import React from 'react'

import { Card } from '@/components/ui/card'

type ImagePrismaProps = {
  imageUrl: string
  altText: string
}

export const ImagePrisma: React.FC<ImagePrismaProps> = ({
  imageUrl,
  altText
}) => {
  return (
    <Card className='relative size-64 rotate-45 overflow-hidden '>
      <Image
        src={imageUrl}
        alt={altText}
        width={640}
        height={640}
        className='absolute inset-0 size-full -rotate-45 scale-150 object-cover'
      />
    </Card>
  )
}
