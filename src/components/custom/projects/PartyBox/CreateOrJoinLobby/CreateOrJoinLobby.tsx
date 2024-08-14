'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { usePartyBoxSocket } from '@/components/providers/PartyBoxProvider'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Define Zod schema for form validation
const joinLobbySchema = z.object({
  key: z.string().min(1, 'Lobby key is required'),
  playerName: z.string().min(1, 'Player name is required')
})

const createLobbySchema = z.object({
  playerName: z.string().min(1, 'Player name is required')
})

export const CreateOrJoinLobby: React.FC = () => {
  const { createLobby, joinLobby, key, playerName, setPlayerName, lobby } =
    usePartyBoxSocket()

  const router = useRouter()

  // Use react-hook-form with Zod for validation
  const joinForm = useForm<z.infer<typeof joinLobbySchema>>({
    resolver: zodResolver(joinLobbySchema),
    defaultValues: { key, playerName }
  })

  const createForm = useForm<z.infer<typeof createLobbySchema>>({
    resolver: zodResolver(createLobbySchema),
    defaultValues: { playerName }
  })

  // Handle form submission
  const onJoinSubmit = (data: z.infer<typeof joinLobbySchema>) => {
    joinLobby(data.key)
  }

  const onCreateSubmit = (data: z.infer<typeof createLobbySchema>) => {
    setPlayerName(data.playerName)
    createLobby()
  }

  useEffect(() => {
    if (lobby) {
      router.push(`/partybox/${key}`)
    }
  }, [lobby, key, router])

  return (
    <Tabs defaultValue='join' className='w-[600px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='join'>Join</TabsTrigger>
        <TabsTrigger value='create'>Create</TabsTrigger>
      </TabsList>
      <TabsContent value='join'>
        <Card>
          <CardHeader>
            <CardTitle>Join</CardTitle>
            <CardDescription>Play with your friends!</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 space-y-2'>
            <Form {...joinForm}>
              <form
                onSubmit={joinForm.handleSubmit(onJoinSubmit)}
                className='flex flex-col gap-4'
              >
                <FormField
                  control={joinForm.control}
                  name='key'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Enter lobby key'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the key of your friends lobby.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name='playerName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Enter your name'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>Join Lobby</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='create'>
        <Card>
          <CardHeader>
            <CardTitle>Create</CardTitle>
            <CardDescription>Invite your friends!</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4 space-y-2'>
            <Form {...createForm}>
              <form
                onSubmit={createForm.handleSubmit(onCreateSubmit)}
                className='flex flex-col gap-4'
              >
                <FormField
                  control={createForm.control}
                  name='playerName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Enter your name'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>Create Lobby</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
