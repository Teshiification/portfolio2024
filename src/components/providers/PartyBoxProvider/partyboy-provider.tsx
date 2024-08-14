'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

import { useToast } from '@/components/ui/use-toast'
import { toast } from 'sonner'

const randomKeyGenerator = require('random-key')

interface PartyBoxContextProps {
  socket: Socket | null
  key: string
  setKey: React.Dispatch<React.SetStateAction<string>>
  playerName: string
  setPlayerName: React.Dispatch<React.SetStateAction<string>>
  lobby: any
  setLobby: React.Dispatch<React.SetStateAction<any>>
  selectGame: (game: string) => void
  readyUp: () => void
  joinLobby: (lobbyKey: string) => void
  createLobby: () => void
  leaveLobby: () => void
}

const PartyBoxContext = createContext<PartyBoxContextProps | undefined>(
  undefined
)

export const PartyBoxProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [key, setKey] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [lobby, setLobby] = useState<any>(null)

  useEffect(() => {
    const socketInstance = io()

    setSocket(socketInstance)

    socketInstance.on('lobbyUpdate', (lobbyData: any) => {
      setLobby(lobbyData)
    })

    socketInstance.on('error', (message: string) => toast.error(message))

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const selectGame = (game: string) => {
    socket?.emit('selectGame', { key, game })
  }

  const readyUp = () => {
    socket?.emit('readyUp', { key, playerName })
  }

  const joinLobby = (lobbyKey: string) => {
    if (!socket) {
      toast.error('Socket connection not established.')
      return
    }

    socket.emit(
      'checkPlayerName',
      { key: lobbyKey, playerName },
      (isUnique: boolean) => {
        if (isUnique) {
          setKey(lobbyKey)
          socket.emit('joinLobby', { key: lobbyKey, playerName })
        } else {
          toast.error(
            'Player name is already taken. Please choose a different name.'
          )
        }
      }
    )
  }

  const createLobby = () => {
    if (!socket) {
      toast.error('Socket connection not established.')
      return
    }

    const newKey = randomKeyGenerator.generate(6)

    if (!newKey || newKey.length <= 0) {
      toast.error('Failed to generate a key for the lobby')
      return
    }

    if (!playerName || playerName.length <= 0) {
      toast.error('No player name provided')
      return
    }

    socket.emit(
      'createLobby',
      { playerName, key: newKey },
      (response: { success: boolean; message?: string }) => {
        if (response.success) {
          setKey(newKey)
          toast.success(`Lobby created: ${newKey}`)
        } else {
          toast.error(response.message || 'Failed to create the lobby.')
        }
      }
    )
  }

  const leaveLobby = () => {
    if (!socket) {
      toast.error('Socket connection not established.')
      return
    }

    socket.emit('leaveLobby', { key, playerName }, (updatedLobby: any) => {
      setLobby(updatedLobby)

      if (
        updatedLobby?.owner === playerName ||
        (updatedLobby?.players?.length || 0) === 0
      ) {
        socket.disconnect()
        setSocket(null)
        setKey('') // Clear the lobby key
        setPlayerName('') // Clear the player name if needed
      }
    })

    // Reset the local lobby and key state
    setKey('')
  }

  return (
    <PartyBoxContext.Provider
      value={{
        socket,
        key,
        setKey,
        playerName,
        setPlayerName,
        lobby,
        setLobby,
        selectGame,
        readyUp,
        joinLobby,
        createLobby,
        leaveLobby
      }}
    >
      {children}
    </PartyBoxContext.Provider>
  )
}

export const usePartyBoxSocket = (): PartyBoxContextProps => {
  const context = useContext(PartyBoxContext)
  if (!context) {
    throw new Error('usePartyBoxSocket must be used within a PartyBoxProvider')
  }
  return context
}
