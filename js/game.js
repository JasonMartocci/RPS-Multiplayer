var wins = 0;
var losses = 0;
var ties = 0;

var playerOneGuess, playerTwoGuess;

function playerOneChoices(txt){
    var playerOneGuess = txt;

    if (playerOneGuess == 'r'){
        var displayRock = "<img class='hands' src='images/rock-user.png' alt='Player One Rock'>";
        document.querySelector("#playerOneGuess").innerHTML = displayRock;
    } else if (playerOneGuess == 'p'){
        var displayPaper = "<img class='hands' src='images/paper-user.png' alt='Player One Paper'>";
        document.querySelector("#playerOneGuess").innerHTML = displayPaper;
    }else if (playerOneGuess == 's'){
        var displayScissors = "<img class='hands' src='images/scissors-user.png' alt='Player One Scissors'>";
        document.querySelector("#playerOneGuess").innerHTML = displayScissors;
    }
}

function playerTwoChoices(txt){
    var playerTwoGuess = txt;

    if (playerTwoGuess == 'r'){
        var displayComputerRock = "<img class='hands' src='images/rock-computer.png' alt='Player Two Rock'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerRock;
    } else if (playerTwoGuess == 'p'){
        var displayComputerPaper = "<img class='hands' src='images/paper-computer.png' alt='Player Two Paper'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerPaper;
    }else if (playerTwoGuess == 's'){
        var displayComputerScissors = "<img class='hands' src='images/scissors-computer.png' alt='Player Two Scissors'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerScissors;
    }   
}

// console.log(playerTwoGuess);

// This function is used to figure out who wins.
function gameLogic(txt) {

    var playerOneGuess = txt;
    var playerTwoGuess = txt;

    debugger;

    if ((playerOneGuess == 'r') || (playerOneGuess == 'p') || (playerOneGuess == 's')){

        if ((playerOneGuess == 'r') && (playerTwoGuess == 's')){
            wins++;
        }else if ((playerOneGuess == 'r') && (playerTwoGuess == 'p')){
            losses++;
        }else if ((playerOneGuess == 's') && (playerTwoGuess == 'r')){
            losses++;
        }else if ((playerOneGuess == 's') && (playerTwoGuess == 'p')){
            wins++;
        }else if ((playerOneGuess == 'p') && (playerTwoGuess == 'r')){
            wins++;
        }else if ((playerOneGuess == 'p') && (playerTwoGuess == 's')){
            losses++;
        }else if (playerOneGuess == playerTwoGuess){
            ties++;
        } 

        var displayWins = wins;
        document.querySelector('#wins').innerHTML = displayWins;

        var displayLosses = losses;
        document.querySelector('#losses').innerHTML = displayLosses;

        var displayTies = ties;
        document.querySelector('#ties').innerHTML = displayTies;
    }
}