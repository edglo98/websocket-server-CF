const $lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const $button = document.querySelector('button')

// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  $button.disabled = false
})

socket.on('last-ticket', ticket => {
  $lblNuevoTicket.innerHTML = `Ticket ${ticket}`
})

socket.on('disconnect', () => {
  $button.disabled = true
})

$button.addEventListener('click', () => {
  socket.emit('get-ticket', null, (ticket) => {
    $lblNuevoTicket.innerHTML = ticket
  })
})
