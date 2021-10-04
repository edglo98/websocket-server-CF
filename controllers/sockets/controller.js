import { TicketControl } from '../../models/ticketControl.js'

const ticketControl = new TicketControl()

export const socketController = socket => {
  socket.emit('last-ticket', ticketControl.last)

  socket.on('get-ticket', (payload, callback) => {
    const next = ticketControl.next()

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
