const $ = x => document.querySelector(x)

const $lblTicket1 = $('#lblTicket1')
const $lblEscritorio1 = $('#lblEscritorio1')

const $lblTicket2 = $('#lblTicket2')
const $lblEscritorio2 = $('#lblEscritorio2')

const $lblTicket3 = $('#lblTicket3')
const $lblEscritorio3 = $('#lblEscritorio3')

const $lblTicket4 = $('#lblTicket4')
const $lblEscritorio4 = $('#lblEscritorio4')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('last-four', payload => {
  const [t1, t2, t3, t4] = payload

  if (t1) {
    $lblTicket1.innerHTML = 'Ticket ' + t1.number
    $lblEscritorio1.innerHTML = t1.desktop
  }
  if (t2) {
    $lblTicket2.innerHTML = 'Ticket ' + t2.number
    $lblEscritorio2.innerHTML = t2.desktop
  }
  if (t3) {
    $lblTicket3.innerHTML = 'Ticket ' + t3.number
    $lblEscritorio3.innerHTML = t3.desktop
  }
  if (t4) {
    $lblTicket4.innerHTML = 'Ticket ' + t4.number
    $lblEscritorio4.innerHTML = t4.desktop
  }
})
