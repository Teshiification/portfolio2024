import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'TCGdex',
  description: 'Project made by Danny Sinicco'
}

export default function TCGdexLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={
        'scrollbar scrollbar-track-primary scrollbar-thumb-secondary scrollbar-thumb-rounded-full flex w-full overflow-x-hidden bg-background font-sans text-foreground antialiased'
      }
    >
      {children}
    </div>
  )
}
