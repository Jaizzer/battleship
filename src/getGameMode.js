import onePlayerIcon from './img/1-player.png';
import twoPlayerIcon from './img/2-player.png';
import globalIcon from './img/global.png';

export default async function getGameMode(gameModes) {
    // Create the main container of the prompt that will ask user the game mode.
    const gameModePromptContainer = document.createElement('div');
    gameModePromptContainer.classList.add('game-mode-prompt');
    document.body.appendChild(gameModePromptContainer);

    // Create the title of the prompt.
    const promptTitle = document.createElement('div');
    promptTitle.classList.add('title');
    promptTitle.textContent = 'Choose Game Mode';
    gameModePromptContainer.appendChild(promptTitle);

    // Crate array of icons
    const icons = [onePlayerIcon, twoPlayerIcon, globalIcon];

    // Create divs corresponding to different game modes
    const gameModeDivs = [];
    for (let i = 0; i < gameModes.length; i++) {
        const gameModeDiv = document.createElement('div');
        gameModeDiv.classList.add(gameModes[i]);

        // Add the icon
        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.src = icons[i];
        gameModeDiv.appendChild(icon);

        // Add game mode text.
        const text = document.createElement('div');
        text.classList.add('text');
        // Replace hyphens with spaces and capitalize each first word since 'gameModes' contain string that are hyphenated.
        text.textContent = gameModes[i].replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
        gameModeDiv.appendChild(text);

        gameModePromptContainer.appendChild(gameModeDiv);
        gameModeDivs.push(gameModeDiv);
    }

    return new Promise((resolve) => {
        gameModeDivs.forEach((gameModeDiv) => {
            gameModeDiv.addEventListener('click', (event) => {
                event.preventDefault();
                document.body.innerHTML = '';
                resolve(gameModeDiv.className);
            });
        });
    });
}
