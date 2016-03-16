var wins = 0;
var losses = 0;
var ties = 0;

function playerOneChoices(txt){
    var playerOneGuess = txt;
    var playerOneDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/1/choice/');
    
    if (playerOneGuess == 'r'){
        var displayRock = "<img class='hands' src='images/rock-user.png' alt='Player One Rock'>";
        document.querySelector("#playerOneGuess").innerHTML = displayRock;
        playerOneDataRef.update({rock: "true"});
    } else if (playerOneGuess == 'p'){
        var displayPaper = "<img class='hands' src='images/paper-user.png' alt='Player One Paper'>";
        document.querySelector("#playerOneGuess").innerHTML = displayPaper;
        playerOneDataRef.update({paper: "true"});
    }else if (playerOneGuess == 's'){
        var displayScissors = "<img class='hands' src='images/scissors-user.png' alt='Player One Scissors'>";
        document.querySelector("#playerOneGuess").innerHTML = displayScissors;
        playerOneDataRef.update({scissors: "true"});
    }
    gameLogic(playerOneGuess);
}

function playerTwoChoices(txt){
    var playerTwoGuess = txt;
    var playerTwoDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/2/choice/');

    if (playerTwoGuess == 'r'){
        var displayComputerRock = "<img class='hands' src='images/rock-computer.png' alt='Player Two Rock'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerRock;
        playerTwoDataRef.update({rock: "true"});
    } else if (playerTwoGuess == 'p'){
        var displayComputerPaper = "<img class='hands' src='images/paper-computer.png' alt='Player Two Paper'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerPaper;
        playerTwoDataRef.update({paper: "true"});
    }else if (playerTwoGuess == 's'){
        var displayComputerScissors = "<img class='hands' src='images/scissors-computer.png' alt='Player Two Scissors'>";
        document.querySelector("#playerTwoGuess").innerHTML = displayComputerScissors;
        playerTwoDataRef.update({scissors: "true"});
    }
    gameLogic(playerTwoGuess);   
}



// This function is used to figure out who wins.
function gameLogic(txt) {

    var ref = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    ref.once("value", function(snapshot) {
        var playerOneRock = snapshot.child("players/1/choice/rock").val();
        var playerOnePaper = snapshot.child("players/1/choice/paper").val();
        var playerOneScissors = snapshot.child("players/1/choice/scissors").val();
        var playerTwoRock = snapshot.child("players/2/choice/rock").val();
        var playerTwoPaper = snapshot.child("players/2/choice/paper").val();
        var playerTwoScissors = snapshot.child("players/2/choice/scissors").val();
        console.log(playerOneRock);
        debugger;


        if ((playerOneRock == 'true') || (playerOnePaper == 'true') || (playerOneScissors == 'true')){


            if ((playerOneRock == 'true') && (playerTwoScissors == 'true')){
                wins++;
            }else if ((playerOneRock == 'true') && (playerTwoPaper == 'true')){
                losses++;
            }else if ((playerOneScissors == 'true') && (playerTwoRock == 'true')){
                losses++;
            }else if ((playerOneScissors == 'true') && (playerTwoPaper == 'true')){
                wins++;
            alert("True");
            }else if ((playerOnePaper == 'true') && (playerTwoRock == 'true')){
                wins++;
            }else if ((playerOnePaper == 'true') && (playerTwoScissors == 'true')){
                losses++;
            }else if (playerOneRock == playerTwoRock){
                ties++;
            } 

            var displayWins = wins;
            document.querySelector('#wins').innerHTML = displayWins;

            var displayLosses = losses;
            document.querySelector('#losses').innerHTML = displayLosses;
        }
    });
}

$( document ).ready(function() {
    var chatDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');

    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            chatDataRef.push({name: name, text: text});
            $('#messageInput').val('');
        }
    });
        chatDataRef.on('child_added', function(snapshot) {
            var message = snapshot.val();
            displayChatMessage(message.name, message.text);
    });

    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };  

    var myDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    myDataRef.set({
        "players": {
            "1": {
                "choice": { 
                    "rock": false, 
                    "paper": false, 
                    "scissors": false 
                },
                    "name": "name-input",
                    "losses": 0,
                    "wins": 0
            },
            "2": {
                "choice": {
                    "rock": false, 
                    "paper": false, 
                    "scissors": false  
                },
                    "name": "name-input",
                    "losses": 0,
                    "wins": 0
            },
        },
        "turn": {"1": true, "2": true },
        "chat": {"New": ""}
    });
});




