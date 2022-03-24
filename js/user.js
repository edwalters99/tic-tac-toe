// Renders the board each time the game is played. Requires a parameter (game) - the current game object
const render = function(game) {

    renderMarker(); // Updates the display to show the current markers next to Player 1 / Player 2
    handleGridSizeInput(); // for user input 'Size of Grid'
    renderTurn(); // updates turn highlighting
    renderScores(); // updates scores for best of 5 match
    
    // updates css to account for different grid sizes
    $('.grid').css('grid-template-rows', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);
    $('.grid').css('grid-template-columns', `repeat(${game.getBoardSize()}, minmax(0, 1fr))`);

    // font size gets smaller as grids get larger. This scales it as grid font size inherits from html in css
    $('html').css('font-size', `${ (50 / game.getBoardSize()) / 1.5 }px`);

    $('#player1scoreEl').text(player1Score); 
    $('#player2scoreEl').text(player2Score);
   
    // populates .grid with .grid--square divs
    let htmlOutput = '';
    for (let i = 0; i < game.grid.length; i++) {
        for (let j = 0; j < game.grid.length; j++) {
            htmlOutput += `<div class="grid--square" id="${i}-${j}"><p>${game.getGridVal([i, j])}</p></div>`
            };
        };

    $('.grid').html(htmlOutput);

    addClickHandlers();  //  click handlers need re-adding after dom has been updated with new html after each render
};


const addClickHandlers = function() {
    
    // initial click on lower message button to start the game
    $('#message-panel-btn').on('click', function() {
        game.setIsPlay(true);
        player1.setMarker($('#input-player1-marker').val());
        player2.setMarker($('#input-player2-marker').val());
        render(game);
        $('#message-panel-btn').off('click'); // turns off click handler and hides button during game
        $('#message-panel-btn').css('visibility', 'hidden');
    });
    
    // grid squares to make moves during the game
    $('.grid--square').on('click', function() {
            if (game.getIsPlay()) {
            
                if (player1.getTurn() && game.isGridCellEmpty(this.id)) {  // if its player 1's turn and the grid cell hasn't already been played
                    player1.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  // toggles player's turns
                    player2.setTurn(!player2.getTurn());
                    renderTurn();
                
                } else if (player2.getTurn() && game.isGridCellEmpty(this.id)) {
                    player2.takeTurn(game, this.id);
                    player1.setTurn(!player1.getTurn());  
                    player2.setTurn(!player2.getTurn());
                    renderTurn();
                };
                
                render(game);  // renders board after each turn

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

    $('h1').on('click', function() {  // easter egg
        console.log('clicked')
        $('#input-player1-marker').val("😇");
        $('#input-player2-marker').val("😈");
    });
};

// updates message button when a draw
const renderGameOver = function() {
    $('#message-panel-btn').css('visibility', 'visible');
    $('#message-panel-btn').html(`It's a Draw! <br><strong>Click to start next Round</strong>.`)
    newTurn();
};


const newTurn = function() {
    $('#player1').removeClass('player-active'); // clears turn indicator (red text)
    $('#player2').removeClass('player-active');
    $('#message-panel-btn').off('click'); // sets new click handler for message button
    $('#message-panel-btn').on("click", function(){
        player1.setMarker($('#input-player1-marker').val()); // checks if user has requested change to their markers
        player2.setMarker($('#input-player2-marker').val());
        
        newGame(player1.getMarker(), player2.getMarker(), game.getBoardSize());  // configures new turn
        player1.setIsWinner(false);
        player2.setIsWinner(false);
        render(game);
        game.setIsPlay(true);
        renderTurn();
        
        $('#message-panel-btn').off('click'); // removes message button
        $('#message-panel-btn').css('visibility', 'hidden');
    });    
};

// Uses the winLineArray provided by Game() in mainjs to render a winline to the board
const renderWin = function(winLineArray) {
    
    const domIDArray = [];  // creates an array with string elements that can be used for jQuery DOM ID e.g. ["#1-0", "#1-1"] instead of [ [1,0], [1,1] ]
    
    for (let gridCoord of winLineArray) {
        const stringElem = gridCoord.join('-');
        domIDArray.push( '#' + stringElem);
    };
    
    //updates dom
    for (let domID of domIDArray) {
        $(domID).addClass('winline-active');
    };
   
    // renders winner message and updates scores. Ends match if a player reaches 3.
    if (player1.getIsWinner()){
        $('#message-panel-btn').html(`<span class="accent">Player 1</span> is the Winner! <br><strong>Click to start next Round</strong>`)
        $('#message-panel-btn').css('visibility', 'visible');
        player1Score++ ;
        renderScores();

        if (player1Score >= 3) {
            renderMatchOver(player1);
            return;
        };
    };
    if (player2.getIsWinner()){
        $('#message-panel-btn').html(`<span class="accent">Player 2</span> is the Winner! <br><strong>Click to start next Round</strong>`);
        $('#message-panel-btn').css('visibility', 'visible');
        player2Score++ ;
        renderScores();
        
        if (player2Score >= 3) {
            renderMatchOver(player2);
            return;
        };      
    };
    newTurn(); // starts a new round
};

// message button when a player wins the match
const renderMatchOver = function(player) {
    $('#message-panel-btn').html(`<span class="accent">${player.getName()}</span> wins the Match! <br><strong>Click to Play Again!</strong>`)
    $('#message-panel-btn').css('visibility', 'visible');
    $('#message-panel-btn').off('click');
    $('#message-panel-btn').on('click', function() {
        restartAll(); // restarts entire match
    });
};

// updates score display and makes text bold for winning player throughout match
const renderScores = function() {
    $('#player1-score-row').removeClass('bold');
    $('#player2-score-row').removeClass('bold');
    if (player1Score > player2Score) {
        $('#player1-score-row').addClass('bold');
    } else if (player2Score > player1Score) {
        $('#player2-score-row').addClass('bold');
    };
    $('#player1-score-num').text(player1Score);
    $('#player2-score-num').text(player2Score);
};
// updates red text for each player's turn
const renderTurn = function() {
        
        $('#player1').removeClass('player-active');
        $('#player2').removeClass('player-active');
 
        if (game.getIsPlay()) {  
            if (player1.getTurn()) {
                $('#player1').addClass('player-active');
            };
            if (player2.getTurn()) {
                $('#player2').addClass('player-active');
            };  
        };
};
// Marker display next to Player 1 and Player 2        
const renderMarker = function() {
    $('#player1-marker').text(player1.getMarker());
    $('#player2-marker').text(player2.getMarker());
};


const handleGridSizeInput = function() {
    $('#reset-btn').on('click', function() {
        const userInputGridSize = $('#input-num').val()
        player1.setMarker($('#input-player1-marker').val());
        player2.setMarker($('#input-player2-marker').val());

        if (userInputGridSize) {
            newGame(player1.getMarker(), player2.getMarker(), Number(userInputGridSize));
        } else {
            newGame(player1.getMarker(), player2.getMarker(), 3);
        };
        player1Score = 0;
        player2Score = 0;
        render(game);
        $('#message-panel-btn').css('visibility', 'visible');
        $('#message-panel-btn').html(`Click to <strong>start</strong>`);
    });
};

// restarts entire match
const restartAll = function() {
    player1Score = 0;
    player2Score = 0;
    const player1marker = $('#input-player1-marker').val();
    const player2marker = $('#input-player2-marker').val();
    newGame(player1marker, player2marker, game.getBoardSize());
    render(game);
    $('#message-panel-btn').html(`Click to <strong>start</strong>`);
    $('#message-panel-btn').css('visibility', 'visible');   
};


$(document).ready(function () {
    render(game);   
});









