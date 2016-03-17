var wins = 0;
var losses = 0;
var ties = 0;


$( document ).ready(function() {

    var playerOneDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/1/');
    var playerTwoDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/2/');
    var chatDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');


    // Displays Player one choice of rock, paper or scissors
    playerOneDataRef.on("value", function(snapshot) {

        // var playerOneGuess = snapshot.child("players/1/choice").val();
        // var playerTwoGuess = snapshot.child("players/2/choice").val();
        
        if (snapshot.val().playerOneGuess == 'rock'){
            var displayRock = "<img class='hands' src='images/rock-user.png' alt='Player One Rock'>";
            document.querySelector("#playerOneGuess").innerHTML = displayRock;
        } else if (snapshot.val().playerOneGuess == 'paper'){
            var displayPaper = "<img class='hands' src='images/paper-user.png' alt='Player One Paper'>";
            document.querySelector("#playerOneGuess").innerHTML = displayPaper;
        }else if (snapshot.val().playerOneGuess == 'scissors'){
            var displayScissors = "<img class='hands' src='images/scissors-user.png' alt='Player One Scissors'>";
            document.querySelector("#playerOneGuess").innerHTML = displayScissors;
        }
    });

    // Displays Player two choice of rock, paper or scissors
    playerTwoDataRef.on("value", function(snapshot) {
        if (snapshot.val().choice == 'rock'){
            var displayComputerRock = "<img class='hands' src='images/rock-computer.png' alt='Player Two Rock'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerRock;
        } else if (snapshot.val().choice == 'paper'){
            var displayComputerPaper = "<img class='hands' src='images/paper-computer.png' alt='Player Two Paper'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerPaper;
        }else if (snapshot.val().choice == 'scissors'){
            var displayComputerScissors = "<img class='hands' src='images/scissors-computer.png' alt='Player Two Scissors'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerScissors;
        }
    });

    // Player one chooses rock, paper or scissors
    $(".playerOneBtns").on("click", function() {
        var playerOneGuess = $(this).attr("value");
        if (playerOneGuess == 'r'){
            var displayRock = "<img class='hands' src='images/rock-user.png' alt='Player One Rock'>";
            document.querySelector("#playerOneGuess").innerHTML = displayRock;
            playerOneDataRef.update({choice: "rock"});
        } else if (playerOneGuess == 'p'){
            var displayPaper = "<img class='hands' src='images/paper-user.png' alt='Player One Paper'>";
            document.querySelector("#playerOneGuess").innerHTML = displayPaper;
            playerOneDataRef.update({choice: "paper"});
        }else if (playerOneGuess == 's'){
            var displayScissors = "<img class='hands' src='images/scissors-user.png' alt='Player One Scissors'>";
            document.querySelector("#playerOneGuess").innerHTML = displayScissors;
            playerOneDataRef.update({choice: "scissors"});
        }
        //gameLogic(playerOneGuess);
    });

    // Player two chooses rock, paper or scissors
    $(".playerTwoBtns").on("click", function() {
        var playerTwoGuess = $(this).attr("value");
        if (playerTwoGuess == 'r'){
            var displayComputerRock = "<img class='hands' src='images/rock-computer.png' alt='Player Two Rock'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerRock;
            playerTwoDataRef.update({choice: "rock"});
        } else if (playerTwoGuess == 'p'){
            var displayComputerPaper = "<img class='hands' src='images/paper-computer.png' alt='Player Two Paper'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerPaper;
            playerTwoDataRef.update({choice: "paper"});
        }else if (playerTwoGuess == 's'){
            var displayComputerScissors = "<img class='hands' src='images/scissors-computer.png' alt='Player Two Scissors'>";
            document.querySelector("#playerTwoGuess").innerHTML = displayComputerScissors;
            playerTwoDataRef.update({choice: "scissors"});
        }
        gameLogic(playerTwoGuess);   
    });


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
                "choice": "",
                "name": "name-input",
                "losses": 0,
                "wins": 0
            },
            "2": {
                "choice": "",
                "name": "name-input",
                "losses": 0,
                "wins": 0
            },
        },
        "turn": {"1": true, "2": true },
        "chat": {"New": ""}
    });
});

// This function is used to figure out who wins.
function gameLogic(txt) {
    var ref = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    ref.on("value", function(snapshot) {
        var playerOneGuess = snapshot.child("players/1/choice").val();
        var playerTwoGuess = snapshot.child("players/2/choice").val();

        console.log(playerOneGuess);
        console.log(playerTwoGuess);
        debugger;

        if ((playerOneGuess == 'rock') || (playerOneGuess == 'paper') || (playerOneGuess == 'scissors')){

            if ((playerOneGuess == 'rock') && (playerTwoGuess == 'scissors')){
                wins++;

                //ref.child("players/1/wins/").setValue(wins);
                alert(wins);
            }else if ((playerOneGuess == 'rock') && (playerTwoGuess == 'paper')){
                losses++;
            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'rock')){
                losses++;
            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'paper')){
                wins++;
            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'rock')){
                wins++;
            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'scissors')){
                losses++;
            }else if (playerOneGuess == playerTwoGuess){
                ties++;
            } 

            var displayWins = wins;
            document.querySelector('#wins').innerHTML = displayWins;

            var displayLosses = losses;
            document.querySelector('#losses').innerHTML = displayLosses;
        }
    });
}