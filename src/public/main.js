  window.addEventListener('load', () => {
    const $loginForm = document.getElementById('login-form');
    const $loginGame = document.getElementById('login-game');
    const $loginToken = document.getElementById('login-token');

    const $messageForm = document.getElementById('message-form');
    const $messageInput = document.getElementById('message-input');

    const $messagesContainer = document.getElementById('messages-container')

    let username;
    let socket;

    function login(form) {
        socket = ioConnect();
        username = form.token;
        socket.emit('login', form);
    }

    $loginForm.addEventListener('submit', function (event) {
        event.preventDefault()
        let form = {"game":$loginGame.value,"token":$loginToken.value};
        login(form)
        // Remove the login form and
        // show the chat message form
        $loginForm.remove()
        $messageForm.classList.remove('hidden')
    })

    $messageForm.addEventListener('submit', function (event) {
        event.preventDefault()
        let message = $messageInput.value;
        $messageInput.value = "";
        // Send
        socket.emit('msg', message);
    })

    function ioConnect() {
        let socket = io()
        window.onunload = () => socket.close()
        // Recieve Message
        socket.on('msg', (data) => {
            if (data.from != username) {
                say(data.from, data.message)
            } else {
                say('me', data.message)
            }
        })
        return socket;
    }

    function say(name, message) {
        $messagesContainer.innerHTML +=
            `<div class="chat-message">
            <span style="color: red; font-weight: bold;">${name}:</span> ${message}
        </div>`
        // Scroll down to last message
        $messagesContainer.scrollTop = $messagesContainer.scrollHeight
    }
  });