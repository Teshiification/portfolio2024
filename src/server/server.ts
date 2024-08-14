import { createServer } from 'http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const lobbies: { [key: string]: any } = {}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('New connection:', socket.id)

    socket.on('createLobby', ({ key, playerName }) => {
      if (lobbies[key]) {
        socket.emit('error', 'Lobby already exists')
      } else {
        lobbies[key] = {
          owner: playerName,
          players: [{ name: playerName, ready: false }],
          gameSelected: null
        }
        socket.join(key)
        io.to(key).emit('lobbyUpdate', lobbies[key])
      }
    })

    socket.on('joinLobby', ({ key, playerName }) => {
      const lobby = lobbies[key]
      if (lobby) {
        lobby.players.push({ name: playerName, ready: false })
        socket.join(key)
        io.to(key).emit('lobbyUpdate', lobby)
      } else {
        socket.emit('error', 'Lobby not found')
      }
    })

    socket.on('selectGame', ({ key, game }) => {
      const lobby = lobbies[key]
      if (lobby && lobby.owner === socket.id) {
        lobby.gameSelected = game
        io.to(key).emit('lobbyUpdate', lobby)
      } else {
        socket.emit('error', 'Not authorized')
      }
    })

    socket.on('readyUp', ({ key, playerName }) => {
      const lobby = lobbies[key]
      const player = lobby.players.find((p: any) => p.name === playerName)
      if (player) {
        player.ready = true
        io.to(key).emit('lobbyUpdate', lobby)
      }
    })

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id)
    })
  })

  server.listen(3000, (err?: any) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
