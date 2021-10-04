import { TicketControl } from '../../models/ticketControl.js'

const ticketControl = new TicketControl()

export const socketController = socket => {
  socket.emit('last-ticket', ticketControl.last)

  socket.on('get-ticket', (payload, callback) => {
    const next = ticketControl.next()

    callback(next)
  })
}
