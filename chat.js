document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.boxSizing = 'border-box';

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            #messageContainer {
                margin-bottom: 140px;
            }
            #inputContainer {
                background-color: white;
            }
        }
    `;

    const messageContainer = document.createElement('div');
    messageContainer.style.height = 'calc(100vh - 120px)';
    messageContainer.style.maxWidth = '800px';
    messageContainer.style.width = '95%'; 
    messageContainer.style.overflowY = 'auto';
    messageContainer.style.marginBottom = '50px';
    messageContainer.style.padding = '15px';
    messageContainer.style.backgroundColor = '#00C853';
    messageContainer.style.borderRadius = '10px';
    messageContainer.style.margin = '0 auto 110px';
    messageContainer.style.marginBottom = '110px';
    messageContainer.id = 'messageContainer';

    const inputContainer = document.createElement('div');
    inputContainer.style.position = 'fixed';
    inputContainer.style.bottom = '0';
    inputContainer.style.left = '50%';
    inputContainer.style.transform = 'translateX(-50%)';
    inputContainer.style.width = '95%';
    inputContainer.style.maxWidth = '800px';
    inputContainer.style.padding = '10px';
    inputContainer.style.display = 'flex';
    inputContainer.style.flexDirection = 'column';
    inputContainer.style.gap = '10px';
    inputContainer.id = 'inputContainer';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '12px';
    usernameInput.style.borderRadius = '5px';
    usernameInput.style.border = '1px solid #ddd';
    usernameInput.style.boxSizing = 'border-box';
    usernameInput.maxLength = 50;
    usernameInput.id = 'usernameInput';
    usernameInput.placeholder = 'Ingresa tu nombre de usuario';

    const inputArea = document.createElement('input');
    inputArea.type = 'text';
    inputArea.style.flex = '1';
    inputArea.style.padding = '12px';
    inputArea.style.borderRadius = '5px';
    inputArea.style.border = '1px solid #ddd';
    inputArea.style.boxSizing = 'border-box';
    inputArea.maxLength = 140;
    inputArea.placeholder = 'Escribe un mensaje...';
    inputArea.id = 'inputArea';


    const messageInputContainer = document.createElement('div');
    messageInputContainer.style.display = 'flex';
    messageInputContainer.style.gap = '10px';
    messageInputContainer.style.width = '100%';

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Enviar';
    sendButton.style.padding = '12px 24px';
    sendButton.style.backgroundColor = '#00C853';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '5px';
    sendButton.style.cursor = 'pointer';
    sendButton.style.transition = 'background-color 0.3s ease';
    sendButton.onclick = function() {
        if (inputArea.value.trim() !== '' && usernameInput.value.trim() !== '') {
            sendMessage(usernameInput.value.trim(), inputArea.value.trim());
            inputArea.value = '';
        }
    };
    sendButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#00a045';
    });
    sendButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#00C853';
    });
    
    const themeToggle = document.createElement('button');
    themeToggle.textContent = localStorage.getItem('theme') === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
    themeToggle.textContent = 'Cambiar tema';
    sendButton.style.padding = '10px 20px';
    sendButton.style.borderRadius = '5px';
    sendButton.style.border = 'none';
    sendButton.style.backgroundColor = '#4CAF50';
    sendButton.style.color = 'white';
    sendButton.style.cursor = 'pointer';
    sendButton.style.fontSize = '14px';
    themeToggle.style.position = 'fixed';
    themeToggle.style.top = '10px';
    themeToggle.style.right = '40px';
    themeToggle.style.backgroundColor = '#4CAF50';
    themeToggle.style.color = 'white';
    themeToggle.style.padding = '10px';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '5px';
    themeToggle.style.cursor = 'pointer';

    themeToggle.onclick = function() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setLightTheme(); 
        } else {
            setDarkTheme();
        }
    };

    function setDarkTheme() {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
        messageContainer.style.backgroundColor = '#00C853';
        const messages = document.querySelectorAll('#messageContainer > div');
        messages.forEach(msg => {
            msg.style.backgroundColor = '#424242';
            msg.style.color = '#fff';
            const username = msg.querySelector('span');
            if (username) {
                username.style.color = '#fff';
            }
        });
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Cambiar a tema claro';
    }

    function setLightTheme() {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        messageContainer.style.backgroundColor = '#00C853';
        const messages = document.querySelectorAll('#messageContainer > div');
        messages.forEach(msg => {
            msg.style.backgroundColor = 'white';
            msg.style.color = '#000';
            const username = msg.querySelector('span');
            if (username) {
                username.style.color = '#333';
            }
        });
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Cambiar a tema oscuro';
    }

    if (localStorage.getItem('theme') === 'dark') {
        setDarkTheme(); 
    } else {
        setLightTheme();
    }

    messageInputContainer.appendChild(inputArea);
    messageInputContainer.appendChild(sendButton);
    inputContainer.appendChild(usernameInput);
    inputContainer.appendChild(messageInputContainer);

    body.appendChild(messageContainer);
    body.appendChild(inputContainer);
    body.appendChild(themeToggle);

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
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    container.innerHTML = '';

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.style.margin = '8px 0';
        messageElement.style.padding = '12px';
        messageElement.style.backgroundColor = isDarkMode ? '#424242' : 'white';
        messageElement.style.color = isDarkMode ? '#fff' : '#000';
        messageElement.style.maxWidth = '100%';
        messageElement.style.wordWrap = 'break-word';
        messageElement.style.borderRadius = '8px';
        messageElement.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

        const messageText = document.createElement('span');
        messageText.textContent = msg.username + ': ';
        messageText.style.fontWeight = 'bold';
        messageText.style.color = isDarkMode ? '#fff' : '#333';

        const messageContent = processMessage(msg.message, isDarkMode);

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
                image.style.height = 'auto';
                image.style.maxWidth = '100%';
                image.style.maxHeight = '200px';
                image.style.borderRadius = '8px';
                image.style.margin = '5px 0';
                fragment.appendChild(image);
            } else {
                const link = document.createElement('a');
                link.href = part;
                link.textContent = 'Ver enlace';
                link.target = '_blank';
                link.style.color = '#2196F3';
                link.style.textDecoration = 'none';
                link.style.fontWeight = '500';
                fragment.appendChild(link);
            }
        } else {
            const textNode = document.createTextNode(part + ' ');
            fragment.appendChild(textNode);
        }
    });
    return fragment;
}
