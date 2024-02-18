export default async function getGameMode(gameModes) {
    // Create the main container of the prompt that will ask user the game mode.
    const gameModePromptContainer = document.createElement('div');
    document.body.appendChild(gameModePromptContainer);

    // Create the title of the prompt.
    const promptTitle = document.createElement('div');
    promptTitle.textContent = 'Choose Game Mode';
    gameModePromptContainer.appendChild(promptTitle);

    // Create a form for selecting game modes.
    const form = document.createElement('form');
    gameModePromptContainer.appendChild(form);

    // Create the select element to contain the game mode choices.
    const select = document.createElement('select');
    form.appendChild(select);

    // Put the gamemode as option inside select element.
    gameModes.forEach((gameMode) => {
        const option = document.createElement('option');
        option.value = gameMode;
        // Replace hyphens with spaces and capitalize each first word since 'gameModes' contain string that are hyphenated.
        option.textContent = gameMode.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
        select.appendChild(option);
    });

    // Add the submit button to the form.
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Start Game';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    return new Promise((resolve) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            document.body.innerHTML = '';
            resolve(select.value);
        });
    });
}
