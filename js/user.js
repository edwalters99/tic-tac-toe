const render = function(game) {
    // console.log(game.grid);
    let output = '';
    // $('.grid').css('background-color', 'lightblue')  // CHANGE THIS
    // const gridRowCSS = 'grid-template-rows', 'repeat(4, auto)';
    // const gridColCSS = 'grid-template-columns', 'repeat(4, auto)';
    // console.log(gridRowCSS) 
 
    
    $('html').css('font-size', `${70 / game.getBoardSize()}px`);
    $('.grid').css('grid-template-rows', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);
    $('.grid').css('grid-template-columns', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);
   
   
    for (let i = 0; i < game.grid.length; i++) {
        for (let j = 0; j < game.grid.length; j++) {
            output += `<div class="grid--square" id="${i}-${j}">${game.getGridVal([i, j])}</div>`
            };
        };
        
    console.log(output)
    $('.grid').html(output);

    addClickHandlers();  // re-adds click handlers after html has been regenerated
};



const addClickHandlers = function() {
    
    $('.grid--square').on("click", function() {
        
            if (game.getIsPlay()) {

                if (player1.getTurn() && game.isGridCellEmpty(this.id)) {  // if its player 1's turn and the grid cell hasn't already been played
                    player1.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                
                } else if (player2.getTurn() && game.isGridCellEmpty(this.id)) {
                    player2.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                };
                
                render(game);  // renders after each turn


                if (game.checkGridFull()) {
                    renderGameOver();
                    game.setIsPlay(false);
                        
                };
                if (game.checkForWin()) {
                    const winLineArray = game.checkForWin();
                    renderWin(winLineArray);
                    game.setIsPlay(false);
                };
            };
    });
};


const renderGameOver = function() {
    $('body').append(`<p>GAME OVER</p>`)
}


const renderWin = function(winLineArray) {
    const domIDArray = [];  // array with string elements that can be used for jQuery DOM ID e.g. ["#1-0", "#1-1"] instead of [ [1,0], [1,1] ]
    for (let gridCoord of winLineArray) {
        const stringElem = gridCoord.join('-');
        domIDArray.push( "#" + stringElem);
    };

    for (let domID of domIDArray) {
        $(domID).css("background-color", "red")
    };
   
    if (player1.getIsWinner()){
        $('body').append(`<p>Player 1 is the Winner!</p>`)
    }
    if (player2.getIsWinner()){
        $('body').append(`<p>Player 2 is the Winner!</p>`)
    }
};


$(document).ready(function () {
    render(game);
});









