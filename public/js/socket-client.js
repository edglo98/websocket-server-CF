// eslint-disable-next-line no-undef
const socket = io()
const $ = key => document.querySelector(key)
const $blStatus = $('#lbl-status')
const $formServer = $('#form-server')

socket.on('connect', () => {
  $blStatus.style.color = 'green'
  $blStatus.innerHTML = 'Online'
})

socket.on('disconnect', () => {
  $blStatus.style.color = 'red'
  $blStatus.innerHTML = 'Offline'
})

socket.on('send-menssage', payload => {
  console.log(payload)
})

$formServer.addEventListener('submit', (e) => {
  e.preventDefault()
  const $msg = e.target.msg

  const payload = {
    msg: $msg.value,
    id: '12334231'
  }
  socket.emit('send-menssage', payload, (id) => {
    console.log('id desde el server', id)
  })
})
