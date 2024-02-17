export default function passDevice(playerName) {
    document.body.innerHTML = '';
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');

    const loadingScreenText = document.createElement('div');
    loadingScreenText.classList.add('text');
    loadingScreenText.innerHTML = `Switching to ${playerName}...`;
    loadingScreen.appendChild(loadingScreenText);

    const loadingIcon = document.createElement('div');
    loadingIcon.classList.add('icon');
    loadingScreen.appendChild(loadingIcon);

    const button = document.createElement('button');
    button.classList.add('switch');
    button.innerHTML = 'Switch';
    loadingScreen.appendChild(button);

    document.body.appendChild(loadingScreen);

    return new Promise((resolve) => {
        button.addEventListener('click', () => {
            resolve();
        });
    });
}
