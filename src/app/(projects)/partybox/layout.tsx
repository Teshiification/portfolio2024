import '@/styles/globals.css'

import type { Metadata } from 'next'
import React from 'react'

import { PartyBoxProvider } from '@/components/providers/PartyBoxProvider'

export const metadata: Metadata = {
  title: 'Partybox',
  description: 'Project made by Danny Sinicco'
}

export default function PartyBoxLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PartyBoxProvider>{children}</PartyBoxProvider>
}
