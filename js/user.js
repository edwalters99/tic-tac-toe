const render = function(board) {
    // console.log(board.grid);
    let output = '';
    $('.grid').css('background-color', 'lightblue')  // CHANGE THIS
    for (let i = 0; i < board.grid.length; i++) {
        for (let j = 0; j < board.grid.length; j++) {
            output += `<div class="grid--square" id="${i}-${j}">${board.getGrid([i, j])}</div>`
            };
        };
    $('.grid').html(output);
    addClickHandlers();  // re-adds click handlers after html has been regenerated
};



const addClickHandlers = function() {
    console.log(board.getIsPlay())
    
    $('.grid--square').on("click", function() {
        console.log(board.getIsPlay())
        

            if (board.getIsPlay()) {

                if (player1.getTurn() && board.isGridCellEmpty(this.id)) {  // if its player 1's turn and the grid cell hasn't already been played
                    player1.takeTurn(board, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    if (board.checkForWin()) {
                        board.setIsPlay(false);
                    };
        
                } else if (player2.getTurn() && board.isGridCellEmpty(this.id)) {
                    player2.takeTurn(board, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    if (board.checkForWin()) {
                        board.setIsPlay(false);
                    };
                    console.log(board.checkForWin());
                };
         
                render(board);






            }















        


     
    })









 
};

render(board);



