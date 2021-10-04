import { TicketControl } from '../../models/ticketControl.js'

const ticketControl = new TicketControl()

export const socketController = socket => {
  socket.emit('last-ticket', ticketControl.last)
  socket.emit('last-four', ticketControl.last4)
  socket.emit('await-tickets', ticketControl.tickets)

  socket.on('get-ticket', (payload, callback) => {
    const next = ticketControl.next()
    socket.broadcast.emit('await-tickets', ticketControl.tickets)

    callback(next)
  })

  socket.on('attend-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      const res = {
        ok: false,
        msg: 'El escritorio es obligatorio'
      }
      return callback(res)
    }

    const ticket = ticketControl.takeTicket(desktop)

    socket.broadcast.emit('last-four', ticketControl.last4)
    socket.emit('await-tickets', ticketControl.tickets)
    socket.broadcast.emit('await-tickets', ticketControl.tickets)

    if (!ticket) {
      const res = {
        ok: false,
        msg: 'No hay tickets pendientes'
      }
      return callback(res)
    }

    const res = {
      ok: true,
      ticket
    }
    return callback(res)
  })
}
