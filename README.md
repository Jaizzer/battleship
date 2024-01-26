# battleship

Battleship game

Thing needed to be created: 

    1. Board
        - has array for ships. (one 4s, two 3s, two 2s, four 1s) fleet size: 18, ships are appended to this 
          arrya when calling placeShip()
        - (10x10)
        - has coordinate system
      

        - has 'receiveAttack()' this method calls the hit() method to the ship, also updates a property if grid
          'isHit' ' ({isHit: false, ship: Ship1}, {isHit: true, ship: null})
        - increment hit count if a ship was hit



        - need a method to get the ship at a given coordinate, 'findShip()'


        - empty grid should have label, like 'empty' or something


        - how to 'placeShip()'?    
            - 10x10 array
            === each grid would have reference to the ship placed 
                (e.d "Ship1, Ship1 Ship2)
            -the origin is the only thing movable and should be the left of the ship if horizontal
            - the origin is bottom of the ship if orientation is vertical
        - ship should be 1 grid apart and not out of bounds.
            if atleast one grid is occupied or adjacent to an occupied grid, make the origin invalid throw error.
        - has logic that checks how many grids to use base on the length of the ship


        - has 'checkFleetStatus()' method to see if all ships were sunk (use minimum fire count corresponding to the total size of the fleet), if hit count matches the fleet size, fleet is terminated.




    2. Ship
        - ship should have 'orientation' property 
        - has 'length'
        - has hit counts, use the method 'hit()'

            - should update hit count and also contain logic if the hit was enough
              to update isSunk()

        - has 'isSunk()' property

        --- should ship have the 'getCoordinate()' method?



main algorithm,

    createPlayer() {
        playerName,
        gameBoard,
        isComputer

    }

    startGame(player1, player2) {
        turn: player1,
        getCurrentTurn()
        askPlayerToFire() 
            => display a prompt if isComputer === false
            => set currentHit to zero before choosing a coordinate
        updateDOM
        if currentPlayer.gameboard.currentHit != 1,
            updateTurn()
    }


    updateDOM {
        get the last coordinate that was selected by the player,
        if black, show a dot,
        else cross out the ship

        if onlineGame, parse received json file from the server
    }

    updateDatabase() {
        send new jsonfile to the server reflecting changes
    }