var wins = 0;
var losses = 0;

    

$( document ).ready(function() {
    var myDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    var chatDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');
    var playerOneDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/1/');
    var playerTwoDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/2/');

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
        gameLogic();
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
        gameLogic();   
    });
    
    // Displays player one choice of rock, paper or scissors
    playerOneDataRef.on("value", function(snapshot) {
        if (snapshot.val().choice == 'rock'){
            var displayRock = "<img class='hands' src='images/rock-user.png' alt='Player One Rock'>";
            document.querySelector("#playerOneGuess").innerHTML = displayRock;
        } else if (snapshot.val().choice == 'paper'){
            var displayPaper = "<img class='hands' src='images/paper-user.png' alt='Player One Paper'>";
            document.querySelector("#playerOneGuess").innerHTML = displayPaper;
        }else if (snapshot.val().choice == 'scissors'){
            var displayScissors = "<img class='hands' src='images/scissors-user.png' alt='Player One Scissors'>";
            document.querySelector("#playerOneGuess").innerHTML = displayScissors;
        }

        $("#playerOneName").html(snapshot.val().name);
        $("#playerOneWins").html(snapshot.val().wins);
        $("#playerOneLosses").html(snapshot.val().losses);
    });

    // Displays player two choice of rock, paper or scissors
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

        $("#playerTwoName").html(snapshot.val().name);
        $("#playerTwoWins").html(snapshot.val().wins);
        $("#playerTwoLosses").html(snapshot.val().losses);
    });

    // This function is used to figure out who wins.
    function gameLogic() {
        console.log(gameLogic);
        debugger;

        myDataRef.on("value", function(snapshot) {
            var playerOneGuess = snapshot.child("players/1/choice").val();
            var playerOneWins = snapshot.child("players/1/wins").val();
            var playerOneLosses = snapshot.child("players/1/losses").val();
            var playerTwoGuess = snapshot.child("players/2/choice").val();
            var playerTwoWins = snapshot.child("players/2/wins").val();
            var playerTwoLosses = snapshot.child("players/2/losses").val();

            debugger;


            // if ((playerOneGuess == 'rock') || (playerOneGuess == 'paper') || (playerOneGuess == 'scissors') && (playerTwoGuess == 'rock') || (playerTwoGuess == 'paper') || (playerTwoGuess == 'scissors')){
            //      alert("If works");
            // }

            // if (snapshot.child("players/1/choice/").exists() && snapshot.child("players/2/choice/").exists()) {
            //     alert("If works");
            // }


                if ((playerOneGuess == 'rock') && (playerTwoGuess == 'scissors')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      wins: wins
                    }); 
                    myDataRef.child("players/2/").set({
                      losses: losses
                    });  

                }else if ((playerOneGuess == 'rock') && (playerTwoGuess == 'paper')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      losses: losses
                    }); 
                    myDataRef.child("players/2/").set({
                      wins: wins
                    });
                }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'rock')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      losses: losses
                    }); 
                    myDataRef.child("players/2/").set({
                      wins: wins
                    });
                }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'paper')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      wins: wins
                    }); 
                    myDataRef.child("players/2/").set({
                      losses: losses
                    });
                }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'rock')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      wins: wins
                    }); 
                    myDataRef.child("players/2/").set({
                      losses: losses
                    });
                }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'scissors')){
                    wins++;
                    losses++;
                    myDataRef.child("players/1/").set({
                      losses: losses
                    }); 
                    myDataRef.child("players/2/").set({
                      wins: wins
                    });
                }
            // }
        });
    }

    // Chat feature
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
});

