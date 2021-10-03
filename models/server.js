import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server as IoServer } from 'socket.io'
import { socketController } from '../controllers/sockets/controller.js'
// import dbConection from '../database/config.js'

export class Server {
  constructor () {
    this.port = process.env.PORT
    this.app = express()

    this.server = http.createServer(this.app)

    this.io = new IoServer(this.server)

    this.paths = {}

    // this.conectDB()

    this.middlewares()
    this.routes()

    this.sockets()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.static('public'))
  }

  routes () {
    // this.app.use(this.paths.auth, routerAuth)
  }

  sockets () {
    this.io.on('connection', socketController)
  }

  async getLocalIp () {
    return import('os')
      .then((os) => {
        const networkInterfaces = os.networkInterfaces()
        const ipv4 = networkInterfaces.en0.find(network => network.family === 'IPv4')

        return ipv4.address
      })
  }

  listen () {
    // console.clear()
    this.server.listen(this.port, () => {
      console.log(' -------------------------------------------------')
      console.log(`|  💻 Server runing on port ${this.port}.                 |`)
      console.log(`|  You can watch here: http://localhost:${this.port}/     |`)
    })

    // Run local server
    if (process.env.NODE_ENV === 'development') {
      this.getLocalIp()
        .then(ip => {
          console.log(`|  You can watch here: http://${ip}:${this.port}/  |`)

          return this.app.listeners(this.port, ip, () => {
            console.log('|                                                 |')
            console.log('|  📡 Server runing on local network.             |')
            console.log(`|  You can watch here: http://${ip}:${this.port}/  |`)
            console.log(' ------------------------------------------------- ')
          })
        })
    }
  }
}
