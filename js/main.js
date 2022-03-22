

const Player = function(isHuman, marker) {
    return {

        isHuman: isHuman,

        marker: marker,

        isTurn: false,
        // accepts string separated by '-' e.g. '1-2' (ready for DOM)
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
            };

            console.log("Horizontal Match: " + isRowMatch);
            console.log('Matching cells: ');
            console.log(matchedHorizCells);

           
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
                    matchedVertCells.push([matchingColIndex, i])
                };
            };

            console.log("Vertical Match: " + isColMatch);
            console.log('Matching cells: ');
            console.log(matchedVertCells);
            
           

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

        
      
            console.log(" Diagonal Match: " + isDiagMatch);
            console.log('Matching cells: ');
            console.log(matchedDiagCells);


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
board.grid = [['O', 'O', 'O'],['X', 'O', 'O'],['O', 'X', 'X'],]
board.checkForWin();
render(board);




