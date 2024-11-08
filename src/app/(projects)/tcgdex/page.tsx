"use server"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TCGdex from '@tcgdex/sdk'
import { GalleryHorizontalIcon, GalleryVerticalIcon } from 'lucide-react'
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
    <div className='flex flex-col gap-10 p-4 items-center w-full mt-10 bg-gradient-to-b from-primary/20'>
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
    <Card className={`hover:shadow-xl hover:shadow-primary ease-in-out duration-200 hover:scale-110 transition-all flex flex-col w-full md:w-[295px] md:h-[430px] rounded-none bg-gradient-to-b via-background from-primary/60 to-primary/60`}>
      <CardHeader className='p-0'>
      <CardTitle className="flex justify-around h-8 bg-gradient-to-b bg-gray-500 from-gray-400 w-full">
  {Array.from({ length: 30 }, (_, i) => (
    <div key={`top-riffl-${set.id}-${i}`} className="static w-1 bg-gray-500" />
  ))}
</CardTitle>

      </CardHeader>
      <CardContent className='flex flex-col justify-around items-center size-full'>
      <Image
        src={set?.logo ? `${set.logo}.png` : ""}
        alt={set.symbol || ""}
        width={200}
        height={200}
        className="shadow-2xl shadow-primary rounded-full aspect-square object-contain p-10"
      />
     <span className='font-semibold text-xl'>{set.name}</span>
      </CardContent>
      
      <CardFooter className='flex gap-4 items-center justify-center'>
        <GalleryHorizontalIcon />
        <span>
          {`${set?.cardCount.total||"???"} cards`}
        </span>
      </CardFooter>
      <div className="flex justify-around h-8 bg-gradient-to-b bg-gray-400 from-gray-500 w-full">
      {Array.from({ length: 30 }, (_, i) => (
    <div key={`bottom-riffl-${set.id}-${i}`} className="static w-1 bg-gray-500" />
  ))}
      </div>
    </Card>
    </Link>)}
    )}
  </ul>
  </div>)
}