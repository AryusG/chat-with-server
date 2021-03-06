import { io } from 'socket.io-client'; // function to get individual socket

const form = document.getElementById("form")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const joinRoomButton = document.getElementById("room-button")

const socket = io("http://localhost:3000");
socket.on("connect", () => { // listen to events coming down from server
   displayMessage(`You connected with id: ${socket.id}`)
})

socket.on("receive-message", message => {
   displayMessage(message)
})

form.addEventListener("submit", e => {
   e.preventDefault()
   const message = messageInput.value
   const room = roomInput.value

   if (message === "") return
   displayMessage(message)
   socket.emit("send-message", message, room);
   messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
   const room = roomInput.value
   socket.emit('join-room', room, msg => {
      displayMessage(msg)
   })
})

function displayMessage(message) {
   const div = document.createElement("div")
   div.textContent = message
   document.getElementById("message-container").append(div)
}