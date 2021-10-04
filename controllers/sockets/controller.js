import { TicketControl } from '../../models/ticketControl.js'

const ticketControl = new TicketControl()

export const socketController = socket => {
  socket.on('send-menssage', (payload, callback) => {
    const feedback = { id: 12836231 }
    socket.broadcast.emit('send-menssage', payload)
    callback(feedback)
  })
}
