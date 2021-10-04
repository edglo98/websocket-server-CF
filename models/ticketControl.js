import { createRequire } from 'module'
import fs from 'fs'
const require = createRequire(import.meta.url)

class Ticket {
  constructor (number, desktop) {
    this.number = number
    this.desktop = desktop
  }
}
export class TicketControl {
  constructor () {
    this.last = 0
    this.today = new Date().getDate()
    this.tickets = []
    this.last4 = []

    this.init()
  }

  get toJson () {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4
    }
  }

  async init () {
    const { today, tickets, last4, last } = require('../db/data.json')
    if (today === this.today) {
      this.tickets = tickets
      this.last = last
      this.last4 = last4
    } else {
      this.saveDB()
    }
  }

  saveDB () {
    const { pathname } = new URL('../db/data.json', import.meta.url)
    fs.writeFileSync(pathname, JSON.stringify(this.toJson))
  }

  next () {
    this.last += 1
    const ticket = new Ticket(this.last, null)
    this.tickets.push(ticket)

    this.saveDB()

    return 'Ticket ' + ticket.number
  }

  takeTicket (desktop) {
    if (this.tickets.length === 0) {
      return null
    }

    const ticket = this.tickets.shift()

    ticket.desktop = desktop

    this.last4.unshift(ticket)

    if (this.last4.length > 4) {
      this.last4.splice(-1, 1)
    }

    this.saveDB()

    return ticket
  }
}
