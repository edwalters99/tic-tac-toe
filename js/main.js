

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

        //  checkforWin: function() {
        //      // horizontal
        //      console.log(this.grid)
        //     for (let i = 0; i < this.grid.length; i++) {
        //         const row = this.grid[i];
              
        //         for (j = 0; j < row.length; j++) {
        //             const checkArray = [];
                    
                   
        //             const cell = row[j];
        //             if (!checkArray.includes(cell)) {
        //                 checkArray.push(cell)
        //             }
                   
        //             // console.log(cell + "     " + i,j)
        //         }
        //         console.log(checkArray) + "checkarray"
        //      }
        //  },

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
// board.checkforWin();
render(board);




