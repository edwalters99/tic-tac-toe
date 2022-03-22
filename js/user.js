const render = function(game) {
    // console.log(game.grid);
    let output = '';
    $('.grid').css('background-color', 'lightblue')  // CHANGE THIS
    for (let i = 0; i < game.grid.length; i++) {
        for (let j = 0; j < game.grid.length; j++) {
            output += `<div class="grid--square" id="${i}-${j}">${game.getGrid([i, j])}</div>`
            };
        };
    $('.grid').html(output);
    addClickHandlers();  // re-adds click handlers after html has been regenerated
};



const addClickHandlers = function() {
    console.log(game.getIsPlay())
    
    $('.grid--square').on("click", function() {
        console.log(game.getIsPlay())
        

            if (game.getIsPlay()) {

                if (player1.getTurn() && game.isGridCellEmpty(this.id)) {  // if its player 1's turn and the grid cell hasn't already been played
                    player1.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    if (game.checkForWin()) {
                        game.setIsPlay(false);
                    };
        
                } else if (player2.getTurn() && game.isGridCellEmpty(this.id)) {
                    player2.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    if (game.checkForWin()) {
                        game.setIsPlay(false);
                    };
                    console.log(game.checkForWin());
                };
         
                render(game);
            };  
    })
};

render(game);



