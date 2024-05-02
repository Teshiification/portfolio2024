import '@/styles/globals.css'

import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Project made by Danny Sinicco'
}

export default function RickAndMortyLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='bg-background relative flex h-screen w-full flex-col'>
      {children}
    </div>
  )
}
