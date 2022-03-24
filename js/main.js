// Player Object holds all the information and methods(functions) relating to a Player. e.g. Their marker, whether it is their turn or not, if they are the winner

const Player = function(marker, name) {
    return {
        //initializes object properties
        marker: marker,

        isTurn: false,

        isWinner: false,

        name: name, 

        // accepts cellIDstr separated by '-' e.g. '1-2' (as stored in the DOM as an ID attached to each cell)
        takeTurn: function(game, cellIDStr) {
            game.setGridVal(cellIDStr.split('-'), this.marker);
        },

        // getters and setters for object properties
        getMarker: function(){
            return this.marker;
        },

        getTurn: function() {
            return this.isTurn;
        },

        getIsWinner: function() {
            return this.isWinner;
        },

        getName: function() {
            return this.name;
        },

        setMarker: function(string) {
            this.marker = string;
        },
        
        setIsWinner: function(boolean) {
            this.isWinner = boolean;
        },

        setTurn: function(boolean) {
            this.isTurn = boolean;
        }
    };
};

// Game Object holds all the information and methods(functions) relating to the current game. e.g. The board size, the grid itself (array), and methods to check if a grid cell is unused / empty, check for a win, check if the board is full. 


// accepts 3 parameters - boardSize (from UI), player1 and player 2 objects

const Game = function(boardSize, player1, player2) {
    // in case user tries to enter an excessively large grid which will break the UI / crash the program
    if (boardSize > 15) {  
        boardSize = 15;
    };

    return {
        
        grid: [],
        
        boardSize: boardSize,

        player1Marker: player1.getMarker(),
        player2Marker: player2.getMarker(),

        isPlay: false,  //is game in play?

        
        //getters and setters for object properties

        getBoardSize: function() {
            return this.boardSize;
        },

        getBoard: function() {
            return this.grid;
        },

        // accepts an array [x,y], returns the cell contents
        getGridVal: function([xRow, yCol]) {
           return this.grid[xRow][yCol];
        },

        // accepts an array [x,y] and a value. Sets cell contents to the value.
        setGridVal: function([xRow, yCol], value) {
           this.grid[xRow][yCol] = value;    
        },

        getIsPlay: function() {
           return this.isPlay;
        },

        setIsPlay: function(boolean) {
           this.isPlay = boolean;
        },
    
        // initializes a new board of boardSize and populates it with empty strings.
        initialize: function() {
            for (let i = 0; i < boardSize; i++) {
                const row = new Array(this.boardSize).fill('');  
                this.grid.push(row);
            };
         },

        // checks a provided Cell ID String (passed from DOM) and returns a boolean stating if that grid position is empty or not. 
        isGridCellEmpty: function(cellIDStr) {
            const cellContents = this.getGridVal(cellIDStr.split('-'));
            return cellContents === "";
        },

        // loops through the grid to check if it is full (a draw)
        checkGridFull : function() {
            let gridFull = true;
            for (let row of this.grid) {
                 for (let cell of row) {
                     if (cell === "") {
                         gridFull = false;
                     };
                 };
             };
            return gridFull;
        },


        // Checks Board for wins in horizontal, vertical and diagonal directions. If match found, returns an array containing the grid co-ords of the matching tiles.
       
        checkForWin: function() {
          
            // *** ROW (HORIZONTAL) ***

            let isRowMatch = false;
            let matchingRowIndex;
            const matchedHorizCells = [];

            for (let i = 0; i < this.grid.length; i++) {
                const row = this.grid[i]; // assigns row when iterating through grid
                
                if (row.every((val) => val && val === row[0])) {  // checks if all values in the row array are the same as the first item, and not empty strings (val is truthy)
                    isRowMatch = true;
                    matchingRowIndex = i;  // captures the matching row index (used below)
                };
            };
        
            // creates an array of cell co-ords required by UI to highlight the grid. Identifies which player won the game based on the matching marker.

            if (isRowMatch) {
                for (let i = 0; i < this.grid.length; i++) {
                    matchedHorizCells.push([matchingRowIndex, i])
                };
                const winningMarker = this.grid[matchingRowIndex][0];

                if (winningMarker === this.player1Marker) {
                    player1.setIsWinner(true);
                    return matchedHorizCells;
                }   else if (winningMarker === this.player2Marker) {
                        player2.setIsWinner(true);
                        return matchedHorizCells;
                    };
            };
            

            // *** COLUMN (VERTICAL) ***
            
            let isColMatch = false;
            let matchingColIndex;
            const matchedVertCells = [];
            
            for (let i = 0; i < this.grid.length; i++) {   // iterates through each column
                const tempColArray = [];
                for (let j = 0; j < this.grid.length; j++) { // iterates through each row
                tempColArray.push(this.getGridVal([j, i]))  // creates a temporary array for each column
                };

                if (tempColArray.every((val) => val && val === tempColArray[0])) {  // checks that all values in the column array are the same as the first item, and not emnpty strings.
                isColMatch = true;
                matchingColIndex = i;
                };
            };

            // creates an array of cell co-ords for matching column

            if (isColMatch) {
                for (let i = 0; i < this.grid.length; i++) {
                    matchedVertCells.push([i, matchingColIndex]);
                };
                const winningMarker = this.grid[0][matchingColIndex];  

                if (winningMarker === this.player1Marker) {
                    player1.setIsWinner(true);
                    return matchedVertCells;
                }   else if (winningMarker === this.player2Marker) {
                        player2.setIsWinner(true);
                        return matchedVertCells;
                    };
            };


            // DIAGONALS

            let isDiagMatch = false;
            let matchedDiagCells = [];  

            // Top left to bottom right 
            let tempDiagValArray = [];
            let tempDiagIndexArray = [];
            
            for (let i = 0; i < this.grid.length; i++) {
                tempDiagValArray.push(this.getGridVal([i,i]));  // traverses grid [0,0], [1,1] etc and pushes values to temporary array for comparison
                tempDiagIndexArray.push([i,i]); // pushes indexes to temp array [0,0], [1,1], [2,2]
            };
      
            if (tempDiagValArray.every((val) => val && val === tempDiagValArray[0])) {  // checks if all values in the results array are the same as the first item, and not empty strings.
                isDiagMatch = true;
                matchedDiagCells = tempDiagIndexArray; 
            };

            //  Bottom left to top right
            tempDiagValArray = [];
            tempDiagIndexArray = [];

            let x = this.grid.length -1;
            let y = 0;

           // initialization starts with x = 2 & y = 0 (bottom left) for a 3x3 grid

            for (let i = 0; i < this.grid.length; i++) {
                tempDiagValArray.push(this.getGridVal([x, y]));
                tempDiagIndexArray.push([x,y]);
                x-- ; // decrements x co-ord
                y++ ; // increments y co-ord    To traverse grid bottom left to top right ([2,0], [1,1], [0,2])
            };
            
            if (tempDiagValArray.every((val) => val && val === tempDiagValArray[0])) {  // checks if all values in the results array are the same as the first item, and not empty strings.
                isDiagMatch = true;
                matchedDiagCells = tempDiagIndexArray;
            };

            // identifies winning player and sets correct player property
            if (isDiagMatch) {
                const winningMarker = this.getGridVal(matchedDiagCells[0]);
                if (winningMarker === this.player1Marker) {
                    player1.setIsWinner(true);
                    return matchedDiagCells;
                }   else if (winningMarker === this.player2Marker) {
                        player2.setIsWinner(true);
                        return matchedDiagCells;
                    };
            };
         },
    };  // closes Object return
};  // closes Game()


let player1Score = 0;  // used for keeping track of wins in best of 5 games
let player2Score = 0;
   
let player1; // need to be global variables so they can be accessed from within functions
let player2;
let game;

// needs to be a function as called from user.js
// player name customization not yet implemented

const newGame = function(player1Marker="X", player2Marker="O", boardSize) {
    player1 = Player(player1Marker, "Player 1");
    player2 = Player(player2Marker, "Player 2");
    game = Game(boardSize, player1, player2);
    game.initialize();
    player1.setTurn(true); 
};

newGame('X', 'O', 3);
