'use client'

import { CheckIcon, TrashIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { usePartyBoxSocket } from '@/components/providers/PartyBoxProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useRouter } from 'next/navigation'

export const GameLobby: React.FC<{ key: string }> = ({
  key
}: {
  key: string
}) => {
  const { setKey, playerName, lobby, selectGame, readyUp, leaveLobby } =
    usePartyBoxSocket()
  const router = useRouter()

  setKey(key)

  useEffect(() => {
    if (!lobby) {
      router.push(`/partybox`)
    }
  }, [lobby, key, router])

  return (
    <Card>
      <CardHeader className='flex'>
        <h2 className='text-2xl'>Lobby {key}</h2>
        <p>Owner {lobby.owner}</p>
        <Button
          variant={'outline'}
          onClick={() => {
            leaveLobby()
          }}
        >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {lobby.players.map((player: any, index: number) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{player.name}</TableCell>
                <TableCell>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    lobby.owner === playerName ? null : player.ready ? (
                      <CheckIcon />
                    ) : (
                      <XIcon />
                    )
                  }
                </TableCell>
                <TableCell className='text-right'>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    lobby.owner === playerName
                      ? null
                      : lobby.owner === playerName && (
                          <Button variant={'ghost'}>
                            <TrashIcon />
                          </Button>
                        )
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>{playerName.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {lobby.owner === playerName && !lobby.gameSelected && (
          <div className='flex flex-col space-y-2'>
            <h3>Select a game</h3>
            <div className='grid grid-cols-3 gap-2'>
              <Button
                onClick={() => selectGame('Game 1')}
                className='size-40 p-0'
              >
                <Card className='size-full'>
                  <CardHeader>Game 1</CardHeader>
                  <CardContent></CardContent>
                </Card>
              </Button>
            </div>
          </div>
        )}

        {lobby.gameSelected && (
          <div>
            <h3>Game Selected: {lobby.gameSelected}</h3>
            <button
              onClick={readyUp}
              className='rounded bg-blue-500 px-4 py-2 text-white'
            >
              Ready Up
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
