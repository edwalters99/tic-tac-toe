const render = function(game) {
    // console.log(game.grid);
    
    renderMarker();
    handleGridSizeInput();
    renderTurn();
    let output = '';
    // $('.grid').css('background-color', 'lightblue')  // CHANGE THIS
    // const gridRowCSS = 'grid-template-rows', 'repeat(4, auto)';
    // const gridColCSS = 'grid-template-columns', 'repeat(4, auto)';
    // console.log(gridRowCSS) 

    // if (game.getIsPlay()) {
    //     $('html').css('font-size', `${50 / game.getBoardSize()}px`);
    // } else {

    // }
    
    $('.grid').css('grid-template-rows', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);
    
    $('.grid').css('grid-template-columns', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);

    //  const htmlCSSFontSize = parseInt($('html').css('font-size'));
    //  console.log(htmlCSSFontSize)

    // $('html').css('font-size', `${ 50 / game.getBoardSize() / 16 * htmlCSSFontSize}px`);
    $('html').css('font-size', `${ ((50 / game.getBoardSize()))/1.5}px`);
   
   
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
    
    $('#message-panel-btn').on("click", function() {
        console.log("clicked working")
        game.setIsPlay(true);
        render(game);
        $('#message-panel-btn').off('click');
       
        $('#message-panel-btn').css('visibility', 'hidden');

    })

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
    $('#message-panel-btn').css('visibility', 'visible');
    $('#message-panel-btn').html(`It's a Draw! <br><strong>Click to start next Round</strong>.`)
    newTurn();
}

const newTurn = function() {
    $('#player1').removeClass('player-active');
    $('#player2').removeClass('player-active');
    $('#message-panel-btn').off('click');
    $('#message-panel-btn').on("click", function(){
        console.log("clicked")
        newGame('X', 'O', game.getBoardSize());
        render(game);
        game.setIsPlay(true);
        renderTurn();
        $('#message-panel-btn').off('click');
        $('#message-panel-btn').css('visibility', 'hidden');

    });    
};

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
        $('#message-panel-btn').css('visibility', 'visible');
        $('#message-panel-btn').html(`<span class="accent">Player 1</span> is the Winner! <br><strong>Click to start next Round</strong>`)
        newTurn();
    };
    if (player2.getIsWinner()){
        $('#message-panel-btn').css('visibility', 'visible');
        $('#message-panel-btn').html(`<span class="accent">Player 2</span> is the Winner! <br><strong>Click to start next Round</strong>`)
        newTurn();      
    };

};



const renderTurn = function() {
        
        $('#player1').removeClass('player-active');
        $('#player2').removeClass('player-active');
        console.log(player1.getIsWinner())
        console.log(player2.getIsWinner())
        if (game.getIsPlay()) {
                
            if (player1.getTurn()) {
                $('#player1').addClass('player-active');
            };
            if (player2.getTurn()) {
                $('#player2').addClass('player-active');
            };  
        };
};
        

const renderMarker = function() {
    $('#player1-marker').text(player1.getMarker());
    $('#player2-marker').text(player2.getMarker());
};


const handleGridSizeInput = function() {
    
    $('#input-btn').on('click', function() {
        const userInputGridSize = $('#input-num').val()
        console.log(userInputGridSize)
        if (userInputGridSize) {
            newGame('X', 'O', Number(userInputGridSize));
        } else {
            newGame('X', 'O', 3);
        };
        render(game);
        $('#message-panel-btn').css('visibility', 'visible');
        $('#message-panel-btn').html(`Click to <strong>start</strong>`);

    })
}




$(document).ready(function () {
    render(game);
    
});









