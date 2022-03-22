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

    $('.grid--square').on("click", function() {
        if (player1.getTurn()) {
            player1.takeTurn(board, this.id);
        } else if (player2.getTurn()) {
            player2.takeTurn(board, this.id);
        };
        player1.setTurn(!player1.getTurn());
        player2.setTurn(!player2.getTurn());
        render(board);

     
    })
};

render(board);



