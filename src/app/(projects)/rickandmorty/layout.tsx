import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from 'next-themes'
import { NavTools } from '@/components/ui/nav-tools'
import React from 'react'
import { ArrowLeftFromLine, ArrowLeftToLine, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

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
    <div className='relative flex h-screen flex-col bg-background overflow-hidden items-center '>
      {children}
    </div>
  )
}
