document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;

    const messageContainer = document.createElement('div');
    messageContainer.style.height = '80vh';
    messageContainer.style.overflowY = 'auto';
    messageContainer.style.marginBottom = '50px';
    messageContainer.id = 'messageContainer';

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
    body.appendChild(inputArea);

    inputArea.focus();
})
