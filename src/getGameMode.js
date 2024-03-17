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

    // Create divs corresponding to different game modes
    const gameModeDivs = [];
    gameModes.forEach((gameMode) => {
        const gameModeDiv = document.createElement('div');
        gameModeDiv.classList.add(gameMode);

        // Replace hyphens with spaces and capitalize each first word since 'gameModes' contain string that are hyphenated.
        gameModeDiv.textContent = gameMode.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
        gameModePromptContainer.appendChild(gameModeDiv);
        gameModeDivs.push(gameModeDiv);
    });

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
