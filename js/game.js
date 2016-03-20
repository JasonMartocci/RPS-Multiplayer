$( document ).ready(function() {
    var playerOneWinsCnt = 0;
    var playerOneLossesCnt = 0;
    var playerTwoWinsCnt = 0;
    var playerTwoLossesCnt = 0;
    var myDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    var chatDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');
    var playerOneDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/1/');
    var playerTwoDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/players/2/');

    myDataRef.set({
        "players": {
            "1": {
                "choice": "",
                "name": "",
                "losses": 0,
                "wins": 0
            },
            "2": {
                "choice": "",
                "name": "",
                "losses": 0,
                "wins": 0
            },
        },
        "turn": "1",
        "chat": {"New": ""}
    });

    // Players enter names to start the game

    // var playerOneGuess = snapshot.child("players/1/choice").val();
    // var playerTwoGuess = snapshot.child("players/2/choice").val();

    $('#submitName').on("click", function(e){
        user = $('#enterName').val();
        console.log(user);
        e.preventDefault();

        myDataRef.once("value", function(snapshot) {
            userOneExists = snapshot.child('players/1/name').val()
            userTwoExists = snapshot.child('players/2/name').val()
            console.log(userOneExists);
            debugger;
            if (userOneExists == "") {
                    queryRef = myDataRef.child('players');
                    queryRef.child('1').set({
                        'name': user
                    })
                } else if (userTwoExists == "") {
                    queryRef = myDataRef.child('players');
                    queryRef.child('2').set({
                        'name': user
                })
                } else if (userTwoExists != "") {
                    alert("Room Is Full!");
            }
        })

        // var hideForm = "";
        // document.querySelector(".playerNameForm").innerHTML = hideForm;
    });

    function playersChoice(){
        myDataRef.update({
          turn: Math.floor((Math.random() * 2) + 1)
        }); 
    };

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
        };

        myDataRef.once("value", function(snapshot) {
            var playerTurn = snapshot.child("turn").val();
            if (playerTurn == 1){
                $('#playerOneGameplay').css({'background-color': '#FFFCD2'});
                $('#playerTwoGameplay').css({'background-color': 'white'});
            }else if(playerTurn == 2){
                $('#playerOneGameplay').css({'background-color': 'white'});
                $('#playerTwoGameplay').css({'background-color': '#FFFCD2'});
                gameLogic();
                debugger;
            };
        }); 
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
        };

        myDataRef.once("value", function(snapshot) {
            var playerTurn = snapshot.child("turn").val();
            if (playerTurn == 1){
                $('#playerOneGameplay').css({'background-color': '#FFFCD2'});
                $('#playerTwoGameplay').css({'background-color': 'white'});
                gameLogic();
            }else if(playerTurn == 2){
                $('#playerOneGameplay').css({'background-color': 'white'});
                $('#playerTwoGameplay').css({'background-color': '#FFFCD2'});
                debugger;
            };
        }); 
    });

    myDataRef.on("value", function(snapshot) {
        var playerOneGuess = snapshot.child("players/1/choice").val();
        var playerTwoGuess = snapshot.child("players/2/choice").val();

        if ((playerOneGuess != '') && (playerTwoGuess != '')) {
            
            setTimeout(function(){
                var playerTurn = snapshot.child("turn").val();
                if (playerTurn == 1){
                    $('#playerOneGameplay').css({'background-color': '#FFFCD2'});
                    $('#playerTwoGameplay').css({'background-color': 'white'});
                }else if(playerTurn == 2){
                    $('#playerOneGameplay').css({'background-color': 'white'});
                    $('#playerTwoGameplay').css({'background-color': '#FFFCD2'}); 
                };
                debugger;
                var clearHandsOne = "";
                var clearHandsTwo = "";
                myDataRef.child("players/1/").update({
                  choice: ""
                }); 
                myDataRef.child("players/2/").update({
                  choice: ""
                }); 
                document.querySelector("#playerOneGuess").innerHTML = clearHandsOne;
                document.querySelector("#playerTwoGuess").innerHTML = clearHandsTwo;
             }, 3000);


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
                var displayStart = "";
                document.querySelector("#playerTwoGuess").innerHTML = displayStart;

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
        }
    });

    // This function is used to figure out who wins.
    function gameLogic() {
        myDataRef.once("value", function(snapshot) {
            var playerOneGuess = snapshot.child("players/1/choice").val();
            var playerOneWins = snapshot.child("players/1/wins").val();
            var playerOneLosses = snapshot.child("players/1/losses").val();
            var playerTwoGuess = snapshot.child("players/2/choice").val();
            var playerTwoWins = snapshot.child("players/2/wins").val();
            var playerTwoLosses = snapshot.child("players/2/losses").val();

            if ((playerOneGuess == 'rock') && (playerTwoGuess == 'scissors')){
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                }); 
                playersChoice();

            }else if ((playerOneGuess == 'rock') && (playerTwoGuess == 'paper')){
                playerTwoWinsCnt++;
                playerOneLossesCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
                playersChoice();

            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'rock')){
                playerTwoWinsCnt++;
                playerOneLossesCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
                playersChoice();

            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'paper')){
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                });
                playersChoice();

            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'rock')){
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                });
                playersChoice();

            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'scissors')){
                playerOneLossesCnt++;
                playerTwoWinsCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
                playersChoice();
            };
        });
    };

    // Chat feature
    var chatName = $('#enterName').val();

    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            chatDataRef.push({name: name, text: text});
            $('#messageInput').val('');
        };
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