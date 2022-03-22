

const Player = function(isHuman, marker) {
    return {

        isHuman: isHuman,

        marker: marker,

        isTurn: false,
        // accepts string separated by - e.g. '1-2' (ready for DOM)
        takeTurn: function(board, cellIDStr) {
            
            board.setGrid(cellIDStr.split('-'), this.marker);
        }

    }

  
};

const Board = function(boardSize) {
    
    return {
        
        grid: [],
        
        boardSize: boardSize,

        player1Marker: null,
        player2Marker: null,
    
        initialize: function() {
            for (let i = 0; i < boardSize; i++) {
                const row = new Array(this.boardSize).fill('');  
                this.grid.push(row);
            }
         },

         checkForWin: function() {
            // horizontal
            console.log(this.grid)
            let foundMatchRow = false;
            let matchRowIndex;
            for (let i = 0; i < this.grid.length; i++) {
                const row = this.grid[i]; // defines 'row' array for each iteration
                if (row.every((val) => val && val === row[0])) {  // checks that all values in the row array are the same as the first item, and not empty strings (val is truthy)
                    foundMatchRow = true;
                    matchRowIndex = i;  // identifies the matching row
                };
            };
            // console.log(foundMatchRow);
            // console.log(matchRowIndex);

            //vertical
            
            let foundMatchCol = false;
            let matchColIndex;
            
            for (let i = 0; i < this.grid.length; i++) {   // iterates through each column
                const tempColArray = [];
                for (let j = 0; j < this.grid.length; j++) { // iterates through each row
             
                tempColArray.push(this.getGrid([j, i]))  // creates a temporary array for each column
            };

        //    console.log(tempColArray)
           if (tempColArray.every((val) => val && val === tempColArray[0])) {  // checks that all values in the column array are the same as the first item, and not emnpty strings.
               foundMatchCol = true;
               matchColIndex = i;
           }

            }
            
        //    console.log(foundMatchCol);
        //    console.log(matchColIndex);

           // diagonals
           let foundMatchDiag = false;
           let matchDiagCells = [];
           // top left to bottom right 
           const tempDiagArray = [];
            for (let i = 0; i < this.grid.length; i++) {
                tempDiagArray.push(this.getGrid([i,i]));
                matchDiagCells.push([i,i]);
            };
            console.log(tempDiagArray)
            if (tempDiagArray.every((val) => val && val === tempDiagArray[0])) {  // checks that all values in the column array are the same as the first item, and not emnpty strings.
                foundMatchDiag = true;

            }


            console.log(foundMatchDiag);
            console.log(matchDiagCells);




         },

         // takes an array [x,y]
         getGrid: function([xRow, yCol]) {
             return this.grid[xRow][yCol];
         },
         // takes an array [x,y] and a value
         setGrid: function([xRow, yCol], value) {
             this.grid[xRow][yCol] = value;    
         }

        

    }
}


const render = function(board) {
    console.log(board.grid);
    let output = '';
    $('.grid').css('background-color', 'lightblue')
    for (let row of board.grid) {
        for (let item of row) {
            output += `<div class="grid--square">${item}</div>`
        };
    };
    $('.grid').html(output);
};

const player1 = Player(true, 'X');
const player2 = Player(true, 'O');
const board = Board(3);
board.initialize();
player1.takeTurn(board, "1-0");
player2.takeTurn(board, "2-0");
player1.takeTurn(board, "1-1");
player2.takeTurn(board, "2-1");
player1.takeTurn(board, "0-0");
player2.takeTurn(board, "2-2");
board.grid = [['X', 'O', 'O'],['X', 'X', 'O'],['O', 'X', 'X'],]
board.checkForWin();
render(board);




