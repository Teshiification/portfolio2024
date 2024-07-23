import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'

import { NavTools } from '@/components/ui/nav-tools'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Danny Sinicco',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground min-h-screen w-screen overflow-x-hidden font-sans antialiased ',
          'scrollbar scrollbar-track-primary scrollbar-thumb-secondary scrollbar-thumb-rounded-full',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NavTools />
          <div className='bg-background relative flex min-h-screen select-none flex-col'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
