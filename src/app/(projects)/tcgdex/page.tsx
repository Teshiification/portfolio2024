"use server"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

  const {width,height} = {width:590*0.4, height:860*0.4}


  return (
    <div className='flex flex-col gap-10 p-4 items-center w-full mt-10'>
      <Card>
        <CardHeader>
          <CardTitle>
            TCGdex
          </CardTitle>
          <CardDescription>
            Every dex you can find out there from an enourmous card database
          </CardDescription>
        </CardHeader>
      </Card>
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
  
    {sets?.map((set)=>{
      return(
    <Link href={`/tcgdex/${set.id}`} key={set.id} passHref>
    <Card className={`w-full md:w-[295px] md:h-[430px]`}>
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
      </CardContent>
      
      <CardFooter>
        <GalleryVerticalIcon />
        <span>
          {`${set?.cardCount.total||"???"} cards`}
        </span>
      </CardFooter>
    </Card>
    </Link>)}
    )}
  </ul>
  </div>)
}