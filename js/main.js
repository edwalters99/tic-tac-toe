

const Player = function(isHuman, marker) {
    return {

        isHuman: isHuman,

        marker: marker,

        isTurn: false,

        isWinner: false,

        // accepts string separated by '-' e.g. '1-2' (ready for DOM)
        takeTurn : function(game, cellIDStr) {
            
            game.setGrid(cellIDStr.split('-'), this.marker);
        },

        getMarker : function(){
            return this.marker;
        },

        getTurn : function() {
            return this.isTurn
        },

        getIsWinner : function() {
            return this.isWinner;
        },
        
        setIsWinner : function(boolean) {
            this.isWinner = boolean
        },

        setTurn : function(boolean) {
            this.isTurn = boolean
        }


    }
};

const Game = function(boardSize, player1, player2) {
    
    return {
        
        grid: [],
        
        boardSize: boardSize,

        player1Marker: player1.getMarker(),
        player2Marker: player2.getMarker(),

        isPlay: false,
    
        initialize: function() {
            for (let i = 0; i < boardSize; i++) {
                const row = new Array(this.boardSize).fill('');  
                this.grid.push(row);
            }
         },

        // takes an array [x,y]
        getGrid: function([xRow, yCol]) {
            return this.grid[xRow][yCol];
        },

        // takes an array [x,y] and a value
        setGrid: function([xRow, yCol], value) {
            this.grid[xRow][yCol] = value;    
        },

        getIsPlay: function() {
            return this.isPlay;
        },

        setIsPlay: function(boolean) {
            this.isPlay = boolean
        },

        isGridCellEmpty: function(cellIDStr) {
            const cellContents = this.getGrid(cellIDStr.split('-'));
            return cellContents === "";
        },

        checkForWin: function() {
            
            // ROW (HORIZONTAL)

            let isRowMatch = false;
            let matchingRowIndex;
            const matchedHorizCells = [];

            for (let i = 0; i < this.grid.length; i++) {
                const row = this.grid[i]; // 'row' array for each iteration
                
                if (row.every((val) => val && val === row[0])) {  // checks that all values in the row array are the same as the first item, and not empty strings (val is truthy)
                    isRowMatch = true;
                    matchingRowIndex = i;  // identifies the matching row by index (used below)
                };
            };
        
            // get array of cell co-ords for matching row

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
            
            //COLUMN (VERTICAL)
            
            let isColMatch = false;
            let matchingColIndex;
            const matchedVertCells = [];
            
            for (let i = 0; i < this.grid.length; i++) {   // iterates through each column
                const tempColArray = [];
                for (let j = 0; j < this.grid.length; j++) { // iterates through each row
                tempColArray.push(this.getGrid([j, i]))  // creates a temporary array for each column
                };

                if (tempColArray.every((val) => val && val === tempColArray[0])) {  // checks that all values in the column array are the same as the first item, and not emnpty strings.
                isColMatch = true;
                matchingColIndex = i;
                };
            };

            // get array of cell co-ords for matching column

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

            // top left to bottom right 
            let tempDiagValArray = [];
            let tempDiagIndexArray = [];
            
            for (let i = 0; i < this.grid.length; i++) {
                tempDiagValArray.push(this.getGrid([i,i]));  // traverses grid [0,0], [1,1] etc and pushes values to temporary array for comparison
                tempDiagIndexArray.push([i,i]); // pushes indexes to temp array [0,0], [1,1], [2,2]
            };
      
            if (tempDiagValArray.every((val) => val && val === tempDiagValArray[0])) {  // checks that all values in the results array are the same as the first item, and not empty strings.
                isDiagMatch = true;
                matchedDiagCells = tempDiagIndexArray; 
            };

            //  bottom left to top right
            tempDiagValArray = [];
            tempDiagIndexArray = [];

            let x = this.grid.length -1;
            let y = 0;

           // initializes with x = 2 & y = 0 (bottom left)

            for (let i = 0; i < this.grid.length; i++) {
                tempDiagValArray.push(this.getGrid([x, y]));
                tempDiagIndexArray.push([x,y]);
                x-- ; // decrements x co-ord
                y++ ; // increments y co-ord    To traverse grid bottom left to top right ([2,0], [1,1], [0,2])
            };
            
            if (tempDiagValArray.every((val) => val && val === tempDiagValArray[0])) {  // checks that all values in the results array are the same as the first item, and not emnpty strings.
                isDiagMatch = true;
                matchedDiagCells = tempDiagIndexArray;
            };


            if (isDiagMatch) {
                const winningMarker = this.getGrid(matchedDiagCells[0]);
                if (winningMarker === this.player1Marker) {
                    player1.setIsWinner(true);
                    return matchedDiagCells;
                }   else if (winningMarker === this.player2Marker) {
                        player2.setIsWinner(true);
                        return matchedDiagCells;
                    };

            };

         }  
    };
};



   


const player1 = Player(true, 'X');
const player2 = Player(true, 'O');
const game = Game(3, player1, player2);
game.initialize();
game.setIsPlay(true);
player1.setTurn(true);

// player1.takeTurn(game, "1-0");
// player2.takeTurn(game, "2-0");
// player1.takeTurn(game, "1-1");
// player2.takeTurn(game, "2-1");
// player1.takeTurn(game, "0-0");
// player2.takeTurn(game, "2-2");
// game.grid = [['X', 'X', 'O'],['O', 'X', 'O'],['O', 'O', 'X'],]
// console.log(game.checkForWin());





