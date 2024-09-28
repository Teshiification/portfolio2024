"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TCGdex from '@tcgdex/sdk'
import { GalleryVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function TCGdexPage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const tcgdex:TCGdex = new TCGdex();

  const sets = await tcgdex.fetchSets();

console.log(sets)
  return (
    <div className='p-4'>
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
  
    {sets?.map((set)=>
    <Link href={`/tcgdex/${set.id}`} key={set.id}>
    <Card >
      <CardHeader>
        <CardTitle>
        <Image 
          src={set?.logo ? `${set.logo}.png` : ""} 
          alt={set.symbol||""} 
          width={200} 
          height={200} 
        />
        </CardTitle>
        <CardDescription>
      {set.name}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        <GalleryVerticalIcon />
        <span>
          {set?.cardCount.total||"???"}
        </span>
      </CardContent>
    </Card>
    </Link>
    )}
  </ul>
  </div>)
}