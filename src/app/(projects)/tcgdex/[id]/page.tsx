"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TCGdex from '@tcgdex/sdk'
import { GalleryVerticalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default async function TCGdexIdPage() {
  const {id} = useParams();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const tcgdex:TCGdex = new TCGdex();

  const cards = await tcgdex.fetchCards(id as string);

console.log(cards)

  return (
    <div className='p-4'>
    <ul className="grid bg-gray-500 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
  
    {cards?.map((card)=>
    <Link href={`/tcgdex/${card.id}`} key={card.id}>
  <Image 
          src={card?.image ? `${card.image}/low.png` : ""} 
          alt={card.id||""} 
          width={200} 
          height={200} 
          className='border-2 border-gray-500 p-2'
        />
    </Link>
    )}
  </ul>
  </div>)
}