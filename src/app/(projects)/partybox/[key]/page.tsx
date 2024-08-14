import { GameLobby } from '@/components/custom/projects/PartyBox'

const PartyBoxGamePage = ({ key }: { key: string }) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      <GameLobby key={key} />
    </div>
  )
}

export default PartyBoxGamePage
