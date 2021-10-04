import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'
const require = createRequire(import.meta.url)

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
}
