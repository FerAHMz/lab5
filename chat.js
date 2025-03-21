document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    const messageContainer = document.createElement('div');
    messageContainer.style.height = '80vh';
    messageContainer.style.overflowY = 'auto';
    messageContainer.style.marginBottom = '50px';
    messageContainer.id = 'messageContainer';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.style.position = 'fixed';
    usernameInput.style.top = '10px';
    usernameInput.style.width = 'calc(100% - 20px)';
    usernameInput.style.left = '10px';
    usernameInput.id = 'usernameInput';
    usernameInput.placeholder = 'Ingresa tu nombre de usuario';

    const inputArea = document.createElement('input');
    inputArea.type = 'text';
    inputArea.style.position = 'fixed';
    inputArea.style.bottom = '10px';
    inputArea.style.width = 'calc(100% - 20px)';
    inputArea.style.left = '10px';
    inputArea.maxLength = 140;
    inputArea.placeholder = 'Escribe un mensaje...';
    inputArea.id = 'inputArea';

    body.appendChild(messageContainer);
    body.appendChild(usernameInput);
    body.appendChild(inputArea);

    inputArea.focus();

    inputArea.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && this.value.trim() !== '' && usernameInput.value.trim() !== '') {
            event.preventDefault();
            sendMessage(this.value.trim());
            this.value = '';
        }
    });

    setInterval(fetchMessages, 5000);

    fetchMessages();
});

async function fetchMessages() {
    try {
        const response = await fetch('https://chat.nrywhite.lat/chats');
        const messages = await response.json();
        displayMessages(messages);
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
    }
}

async function sendMessage(username, message) {
    try {
       await fetch('https://chat.nrywhite.lat/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message }),
        });
        fetchMessages();
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    } 
}

function displayMessages(messages) {
    const container = document.getElementById('messageContainer');
    container.innerHTML = '';

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg.username + ': ' + msg.message;
        container.appendChild(messageElement);
    });
    container.scrollTop = container.scrollHeight;
}