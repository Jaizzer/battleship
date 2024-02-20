export default function renderShipInventory(fleet, renderDestination) {
    // Create fleet container.
    const fleetContainer = document.createElement('div');
    fleetContainer.classList.add('fleet-container');

    // Create the ships.
    fleet.forEach((ship) => {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('ship', `size-${ship.length}`, `${ship.orientation}`);

        fleetContainer.appendChild(shipDiv);
    });
    renderDestination.appendChild(fleetContainer);
}
