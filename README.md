# Tic-Tac-Toe

Welcome to Tic-Tac-Toe! 
(or Noughts and Crosses if you prefer!)

Hours (or more likely _minutes_) of fun...

---------------------------------------------------------------

## Built with

* HTML5
* CSS3
* JavaScript inc. jQuery

---------------------------------------------------------------
## Introduction

This was my first solo project for the General Assembly Software Engineering Immersive bootcamp, completed in 4 days from this [brief.](https://gist.github.com/wofockham/8e959d5cfe7d120f1157) I learnt how to organise a project from scratch, turn game logic into code (using an OOP approach) and have some fun with styling. The biggest challenge was getting the game logic and styling to work for multiple grid sizes.

---------------------------------------------------------------

## Approach

I chose to separate 'business logic' and 'UI' concerns. 

I got the core functionality working first in `main.js` with an unstyled UI, before building out extra functionality and improving the styling.

`main.js` contains the `Player()` and `Game()` objects, and their properties and methods.

`user.js` contains functions to render the UI and handle click events.

This gave me flexibility to reuse function calls across features, resulting in DRYer code, and opened up possibilities for scaling the game.

---------------------------------------------------------------

## Gameplay / Features

Click the message button at the bottom of the window to start the game.

The object of the game is to place your markers so they form a row, column or diagonal across the board (and to prevent your opponent from doing so).

The turn indicator to the left of the board changes colour to indicate each player's turn. Player 1 starts the game.

The scoreboard to the right of the board displays the win count across multiple games (a match). Each match is the best of 5 games. The player that is currently winning the match is marked in **bold**.

After each game is complete, the message button at the bottom of the window appears to display the winner. Click the button to start the next game.

---------------------------------------------------------------

## Customization

Customization settings are found in the footer at the bottom of the window.

The *grid size* can be changed by selecting a number between 1 and 10 and clicking the 'Reset Game' button. (Warning: Match scores will be lost.)

The *player's marker* can be changed by entering up to 3 characters/symbols (or an emoji) into the input box at the bottom of the window. The marker change will take effect from the start of the next game.

---------------------------------------------------------------

## Easter Egg

See if you can find the hidden Easter Egg to turn the game into Angel v Devil mode.

---------------------------------------------------------------

## Installation

Download this repository, then open index.html in a web browser.

Or play the game (hosted on GitHub Pages) [online](https://edwalters99.github.io/tic-tac-toe/)

---------------------------------------------------------------


## Screenshots


![Screenshot](https://edwalters99.github.io/tic-tac-toe/screenshot2.jpg)


![Screenshot](https://edwalters99.github.io/tic-tac-toe/screenshot3.jpg)

---------------------------------------------------------------
## Possible future feature additions

* AI Computer Player. Easy Mode (Random placement) / Hard Mode (Optimal placement)
* Improving the playability of larger grid sizes by counting a win as only 4-in-a-row, instead of whole line.
* Allowing user input for player names.
* Making the app responsive for mobile.


