
const $lblDesktop = document.querySelector('h1')
const $btnAttend = document.querySelector('button')
const $lblTicket = document.querySelector('small')
const $alert = document.querySelector('.alert')
const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('desktop')) {
  window.location = 'index.html'
  throw new Error('El parametro escritorio es obligatorio')
}

const desktop = searchParams.get('desktop')
$lblDesktop.innerHTML = desktop
$alert.style.display = 'none'
// eslint-disable-next-line no-undef
const socket = io()

socket.on('connect', () => {
  $btnAttend.disabled = false
})

socket.on('disconnect', () => {
  $btnAttend.disabled = true
})

socket.on('last-ticket', ticket => {
  // $lblNuevoTicket.innerHTML = `Ticket ${ticket}`
})

$btnAttend.addEventListener('click', () => {
  socket.emit('attend-ticket', { desktop }, payload => {
    if (!payload.ok) {
      $lblTicket.innerHTML = 'nadie'

      $alert.innerHTML = payload.msg
      $alert.style.display = ''
      return
    }

    $lblTicket.innerHTML = `Ticket ${payload.ticket.number}`
  })
})
