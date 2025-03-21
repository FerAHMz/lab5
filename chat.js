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
    usernameInput.style.bottom = '50px';
    usernameInput.style.width = 'calc(100% - 20px)';
    usernameInput.style.left = '10px';
    usernameInput.maxLength = 50;
    usernameInput.id = 'usernameInput';
    usernameInput.placeholder = 'Ingresa tu nombre de usuario';

    const inputArea = document.createElement('input');
    inputArea.type = 'text';
    inputArea.style.position = 'fixed';
    inputArea.style.bottom = '10px';
    inputArea.style.width = 'calc(100% - 80px)';
    inputArea.style.left = '10px';
    inputArea.maxLength = 140;
    inputArea.placeholder = 'Escribe un mensaje...';
    inputArea.id = 'inputArea';

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Enviar';
    sendButton.style.position = 'fixed';
    sendButton.style.bottom = '10px';
    sendButton.style.right = '10px';
    sendButton.style.backgroundColor = '#4CAF50';
    sendButton.onclick = function() {
        if (inputArea.value.trim() !== '' && usernameInput.value.trim() !== '') {
            sendMessage(usernameInput.value.trim(), inputArea.value.trim());
            inputArea.value = '';
        }
    };

    body.appendChild(sendButton);
    body.appendChild(messageContainer);
    body.appendChild(usernameInput);
    body.appendChild(inputArea);

    inputArea.focus();

    inputArea.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && this.value.trim() !== '' && usernameInput.value.trim() !== '') {
            event.preventDefault();
            sendMessage(usernameInput.value.trim(), this.value.trim());
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
        const messageText = document.createElement('span');
        messageText.textContent = msg.username + ': ';

        const messageContent = processMessage(msg.message);

        messageElement.appendChild(messageText);
        messageElement.appendChild(messageContent);
        container.appendChild(messageElement);
    });
    container.scrollTop = container.scrollHeight;
}

function processMessage(text) {
    const urlRegex = /(https?:\/\/\S+)/ig;
    const fragment = document.createDocumentFragment();

    text.split(' ').forEach(part => {
        if (urlRegex.test(part)) {
            if (/\.(jpeg|jpg|png|gif)$/.test(part.toLowerCase())) {
                const image = new Image();
                image.src = part;
                image.style.maxWidth = '200px';  
                image.style.maxHeight = '200px';
                fragment.appendChild(image);
            } else {
                const link = document.createElement('a');
                link.href = part;
                link.textContent = 'Ver enlace';
                link.target = '_blank';
                link.style.color = 'blue';
                link.style.textDecoration = 'underline';
                fragment.appendChild(link);
            }
        } else {
            const textNode = document.createTextNode(part + ' ');
            fragment.appendChild(textNode);
        }
    });
    return fragment;
}
