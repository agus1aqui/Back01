console.log(`funcionando...`)
const chatBox = document.getElementById("chatBox");
const socket = io();

socket.emit("message", "hola mundo")
socket.on("evento", data => {
    console.log(data)
})

/*socket.on('users', (arrayUsers) => {
    const usersList = document.getElementById('usersList');

    usersList.array.forEach(users => {
        usersList.innerHTML += `<li>${users.name} ${users.lastname}</li>`;
    })
})
    */


let user

Swal.fire({
    title: "hola mundo",
    input: "text",
    text: "ingrese su nombre",
    inputValidator: (value) => {
        return !value && "necesitas escribir algo"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value
    socket.emit('user', user)
})

chatBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})


//render 
socket.on("messageLogs", data => {
    const log = document.getElementById("messageLogs")
    let messages = ""

    data.forEach(message => {
        messages = messages + `${message.user} : ${message.message}`;
    })
    log.innerHTML = messages;
})