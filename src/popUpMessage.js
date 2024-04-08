export default function popUpMessage(messageHeading, message) {
    // Create background container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'blurry-background';
    document.body.appendChild(backgroundContainer);

    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';
    backgroundContainer.appendChild(messageContainer);

    // Create heading
    const heading = document.createElement('div');
    heading.className = 'message-heading';
    heading.textContent = messageHeading;
    messageContainer.appendChild(heading);

    // Create message
    const text = document.createElement('text');
    text.className = 'popup-text';
    text.textContent = message;
    messageContainer.appendChild(text);

    // Create close button.
    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.textContent = 'Continue';
    messageContainer.appendChild(closeButton);

    // Add event listener to the close div
    closeButton.addEventListener('click', () => {
        document.body.removeChild(backgroundContainer);
    });
}
