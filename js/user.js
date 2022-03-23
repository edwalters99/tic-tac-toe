const render = function(game) {
    // console.log(game.grid);
    let output = '';
    // $('.grid').css('background-color', 'lightblue')  // CHANGE THIS
    // const gridRowCSS = 'grid-template-rows', 'repeat(4, auto)';
    // const gridColCSS = 'grid-template-columns', 'repeat(4, auto)';
    // console.log(gridRowCSS) 
 
    $('html').css('font-size', `${50 / game.getBoardSize()}px`);
    
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
                    renderTurn();
                
                } else if (player2.getTurn() && game.isGridCellEmpty(this.id)) {
                    player2.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    renderTurn();
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
    $('#message-output').text(`GAME OVER! - It's a Draw!`)
}


const renderWin = function(winLineArray) {
    const domIDArray = [];  // array with string elements that can be used for jQuery DOM ID e.g. ["#1-0", "#1-1"] instead of [ [1,0], [1,1] ]
    for (let gridCoord of winLineArray) {
        const stringElem = gridCoord.join('-');
        domIDArray.push( "#" + stringElem);
    };

    for (let domID of domIDArray) {
        $(domID).addClass('winline-active');
    };
   
    if (player1.getIsWinner()){
        $('#message-output').text(`Player 1 is the Winner!`)
    }
    if (player2.getIsWinner()){
        $('#message-output').text(`Player 2 is the Winner!`)
    }
};

const renderTurn = function() {
        
        $('#player1').removeClass('player-active');
        $('#player2').removeClass('player-active');
        
        if (player1.getIsWinner() === false && player2.getIsWinner() === false){
            if (player1.getTurn()) {
                $('#player1').addClass('player-active');
            };
            if (player2.getTurn()) {
                $('#player2').addClass('player-active');
            };
        }
};

const renderMarker = function() {
    $('#player1-marker').text(player1.getMarker());
    $('#player2-marker').text(player2.getMarker());
};

const handleGridSizeInput = function() {
    
    $('#input-btn').on('click', function() {
        const userInputGridSize = $('#input-num').val()
        console.log(userInputGridSize)
        newGame('X', 'O', Number(userInputGridSize));
        render(game);
    })
}




$(document).ready(function () {
    render(game);
    renderMarker();
    handleGridSizeInput();
});









