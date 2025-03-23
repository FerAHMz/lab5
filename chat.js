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

    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↓';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '120px';
    scrollButton.style.right = '50%';
    scrollButton.style.transform = 'translateX(380px)';
    scrollButton.style.width = '40px';
    scrollButton.style.height = '40px';
    scrollButton.style.backgroundColor = '#00C853';
    scrollButton.style.color = 'white';
    scrollButton.style.border = 'none';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.fontSize = '20px';
    scrollButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    scrollButton.style.transition = 'all 0.3s ease';
    scrollButton.style.display = 'none';
    scrollButton.style.alignItems = 'center';
    scrollButton.style.justifyContent = 'center';
    scrollButton.style.lineHeight = '1';
    scrollButton.style.zIndex = '1000';

    scrollButton.addEventListener('click', () => {
        const container = document.getElementById('messageContainer');
        container.scrollTop = container.scrollHeight;
    });

    scrollButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#00a045';
    });

    scrollButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#00C853';
    });

    messageContainer.addEventListener('scroll', function() {
        const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 50;
        const hasScrolled = this.scrollTop < this.scrollHeight - this.clientHeight;
        const shouldShow = !isAtBottom && hasScrolled && this.scrollHeight > this.clientHeight;
        scrollButton.style.display = shouldShow ? 'flex' : 'none';
    });
    
    const mediaQuery = window.matchMedia('(max-width: 850px)');
    function handleScreenSize(e) {
        if (e.matches) {
            scrollButton.style.right = '20px';
            scrollButton.style.transform = 'none';
        } else {
            scrollButton.style.right = '50%';
            scrollButton.style.transform = 'translateX(380px)';
        }
    }

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
    body.appendChild(scrollButton);

    mediaQuery.addListener(handleScreenSize);
    handleScreenSize(mediaQuery)

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
    
    const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 50;
    const previousScrollTop = container.scrollTop;

    container.innerHTML = '';

    messages.forEach(({ username, message }) => {
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
        messageText.textContent = `${username}: `;
        messageText.style.fontWeight = 'bold';
        messageText.style.color = isDarkMode ? '#fff' : '#333';

        const messageContent = processMessage(message, isDarkMode);

        messageElement.appendChild(messageText);
        messageElement.appendChild(messageContent);
        container.appendChild(messageElement);
    });

    if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
    } else {
        container.scrollTop = previousScrollTop;
    }
}

function processMessage(text, isDarkMode) {
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
                const previewContainer = document.createElement('div');
                previewContainer.style.border = '1px solid #ddd';
                previewContainer.style.borderRadius = '8px';
                previewContainer.style.padding = '15px';
                previewContainer.style.margin = '8px 0';
                previewContainer.style.backgroundColor = isDarkMode ? '#2c2c2c' : '#f5f5f5';
                previewContainer.style.transition = 'all 0.3s ease';

                try {
                    const url = new URL(part);
                    const domain = url.hostname;
                    const path = url.pathname;

                    const domainText = document.createElement('div');
                    domainText.textContent = domain;
                    domainText.style.fontWeight = 'bold';
                    domainText.style.color = isDarkMode ? '#fff' : '#000';
                    domainText.style.marginBottom = '5px';

                    const pathText = document.createElement('div');
                    pathText.textContent = path;
                    pathText.style.color = isDarkMode ? '#ccc' : '#666';
                    pathText.style.fontSize = '14px';
                    pathText.style.marginBottom = '10px';

                    const link = document.createElement('a');
                    link.href = part;
                    link.textContent = 'Visitar sitio web →';
                    link.target = '_blank';
                    link.style.color = '#2196F3';
                    link.style.textDecoration = 'none';
                    link.style.fontWeight = '500';
                    link.style.display = 'inline-block';

                    previewContainer.appendChild(domainText);
                    previewContainer.appendChild(pathText);
                    previewContainer.appendChild(link);

                    previewContainer.addEventListener('mouseenter', () => {
                        previewContainer.style.transform = 'translateY(-2px)';
                        previewContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    });

                    previewContainer.addEventListener('mouseleave', () => {
                        previewContainer.style.transform = 'translateY(0)';
                        previewContainer.style.boxShadow = 'none';
                    });

                } catch (error) {
                    const link = document.createElement('a');
                    link.href = part;
                    link.textContent = 'Ver enlace';
                    link.target = '_blank';
                    link.style.color = '#2196F3';
                    previewContainer.appendChild(link);
                }

                fragment.appendChild(previewContainer);
            }
        } else {
            const textNode = document.createTextNode(part + ' ');
            fragment.appendChild(textNode);
        }
    });
    return fragment;
}
