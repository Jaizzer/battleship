import Gameboard from './Gameboard';
import Player from './Player';
import randomlyPlaceFleet from './randomlyPlaceFleet';
import Ship from './Ship';
import placeShip from './placeShip';

export default async function createPlayer(playerIsComputer, headingText) {
    // Create the fleet of the player.
    const playerFleet = [
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(1, 'vertical'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(2, 'horizontal'),
        new Ship(3, 'vertical'),
        new Ship(3, 'horizontal'),
        new Ship(4, 'horizontal'),
    ];

    // Create the gameboard.
    let playerGameboard = randomlyPlaceFleet(playerFleet, new Gameboard(10));

    if (!playerIsComputer) {
        // If player is not computer, render the form.

        // Create main container for creating player.
        const playerCreationPrompt = document.createElement('div');
        playerCreationPrompt.classList.add('player-creation-prompt');
        document.body.appendChild(playerCreationPrompt);

        // Create the form heading
        const heading = document.createElement('div');
        heading.classList.add('heading');
        heading.textContent = headingText;
        playerCreationPrompt.appendChild(heading);

        // Create prompt title.
        const title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = `Choose Username`;
        playerCreationPrompt.appendChild(title);

        // Create the form.
        const form = document.createElement('form');
        playerCreationPrompt.appendChild(form);

        // Create the input for name.
        const nameInput = document.createElement('input');
        nameInput.id = 'name';
        nameInput.type = 'text';
        nameInput.maxLength = 10;
        nameInput.placeholde = 'Player Name';
        form.appendChild(nameInput);

        // Add label
        const nameInputLabel = document.createElement('label');
        nameInputLabel.setAttribute('for', 'name');
        nameInputLabel.textContent = 'Name';
        form.appendChild(nameInputLabel);

        // Add the submit button to the form.
        const submitButton = document.createElement('button');
        submitButton.classList.add('submit-button');
        submitButton.textContent = 'Create';
        submitButton.type = 'submit';
        form.appendChild(submitButton);

        return new Promise((resolve) => {
            form.addEventListener('submit', async (event) => {
                // Prevent form submission from reloading the page.
                event.preventDefault();

                // Remove the form in the DOM.
                document.body.innerHTML = '';

                // Get player name from the form.
                const playerName = nameInput.value;

                playerGameboard = await placeShip();

                resolve(new Player(playerName, playerGameboard, playerIsComputer));
            });
        });
    } else {
        // If the player is a computer, no need to render the DOM.
        return new Player('Computer', playerGameboard, playerIsComputer);
    }
}
