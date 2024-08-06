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
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={
        'scrollbar scrollbar-track-primary scrollbar-thumb-secondary scrollbar-thumb-rounded-full flex min-h-screen w-screen overflow-x-hidden bg-background font-sans text-foreground antialiased'
      }
    >
      {children}
    </div>
  )
}
