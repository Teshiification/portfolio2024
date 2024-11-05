import { TcgDexGrid } from '@/components/projects/tcgdex/grids/tcgdex-grid'
import TCGdex from '@tcgdex/sdk'

export default async function TCGdexIdPage({
  params
}: {
  params: { id: string }
}) {
  const {id} = params;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const tcgdex:TCGdex = new TCGdex();

  const cards = await tcgdex.fetchCards(id as string);

  return (
    <TcgDexGrid data={cards}/>
)
}