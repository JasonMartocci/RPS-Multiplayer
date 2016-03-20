
$( document ).ready(function() {
    var playerOneWinsCnt = 0;
    var playerOneLossesCnt = 0;
    var playerTwoWinsCnt = 0;
    var playerTwoLossesCnt = 0;
    var myDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/');
    var chatDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/chat');
    var turnDataRef = new Firebase('https://vivid-torch-7282.firebaseio.com/turn');
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
    $('#submitName').on("click", function(e){
        user = $('#enterName').val();
        console.log(user);
        alert(user);
        e.preventDefault();

        myDataRef.once("value", function(snapshot) {
            userExists = snapshot.child('name').val()
            console.log(userExists);
            debugger;
            if (!userExists) {
                    queryRef = myDataRef.child('players');
                    queryRef.child('1').set({
                        'name': user
                })
                    debugger;
                } else {
                    queryRef = myDataRef.child('2');
                    queryRef.child('2').set({
                        'name': user
                })
            }
        })
    });








    // $("#submitName").on("click", function() {
    //     myDataRef.on("value", function(snapshot) {
    //         var playerOneNameSelected = snapshot.child("players/1/name").val();
    //         var playerTwoNameSelected = snapshot.child("players/2/name").val();
    //         var nameEnter = $('#enterName').val().trim();
                
    //         if (playerOneNameSelected == ''){
    //             console.log(playerOneNameSelected);
    //             playerOneDataRef.update({name: nameEnter});
    //         }else if (playerOneNameSelected != '') {
    //             console.log(playerTwoNameSelected);
    //             playerTwoDataRef.update({name: nameEnter});
    //         };

    //         // Displays player one choice of rock, paper or scissors
    //         debugger;
    //     });
    //         return false;


    //     // Get the input values
    //     // var playerOneEnter = $('#playerOneEnter').val().trim(); 
    //     // playerOneDataRef.update({name: playerOneEnter});

    //     // var displayNewForm = "<input type='text' class='form-control' id='playerTwoEnter' placeholder='Player Two Name'> <button id='submitPlayerTwoName' type='submit' class='btn btn-primary'>Start</button>";
    //     // document.querySelector(".form-group").innerHTML = displayNewForm;

    //     $("#submitPlayerTwoName").on("click", function() {
    //         debugger;
    //         // Get the input values
    //         var playerTwoEnter = $('#playerTwoEnter').val().trim(); 
    //         playerTwoDataRef.update({name: playerTwoEnter});

    //         var displayFinalMessage = "Play";
    //         document.querySelector(".form-group").innerHTML = displayFinalMessage;
    //         debugger;
    //         playersChoice();
    //         return false;
    //     });
    // });

    function playersChoice(){
        var displayStart = "";
        
        document.querySelector("#playerOneGuess").innerHTML = displayStart;
        document.querySelector("#playerTwoGuess").innerHTML = displayStart;

        myDataRef.update({
          turn: Math.floor((Math.random() * 2) + 1)
        }); 

        // myDataRef.on("value", function(snapshot) {
        //     var playerTurn = snapshot.child("turn").val();
        //     if (playerTurn == 1){
        //         var displayStart = "Player One Turn";
        //         document.querySelector("#playerTwoGuess").innerHTML = displayStart;
        //     } else if (playerTurn == 2){
        //         var displayStart = "Player Two Turn";
        //         document.querySelector("#playerTwoGuess").innerHTML = displayStart;
        //     };
        // });
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

        // myDataRef.once("value", function(snapshot) {
        //     var playerTurn = snapshot.child("turn").val();
        //     if (playerTurn == 2){
        //         var displayPlayerTurn = "Player Two Turn";
        //         document.querySelector(".playerInstructions").innerHTML = displayPlayerTurn;
        //         playersChoice();
        //         gameLogic();
        //         debugger;
        //     };
        // }); 
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
        gameLogic();

        // myDataRef.once("value", function(snapshot) {
        //     var playerTurn = snapshot.child("turn").val();
        //     if (playerTurn == 1){
        //         var displayPlayerTurn = "Player One Turn";
        //         document.querySelector(".playerInstructions").innerHTML = displayPlayerTurn;
        //         playersChoice();
        //         gameLogic();
        //         debugger;
        //     };
        // }); 
    });

    myDataRef.on("value", function(snapshot) {
        var playerOneGuess = snapshot.child("players/1/choice").val();
        var playerTwoGuess = snapshot.child("players/2/choice").val();

        // if ((playerOneGuess == 'rock') && (playerTwoGuess == 'rock')) {

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
        // }
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
                // myDataRef.child("players").child("1").update({"wins": wins + 1})`
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                }); 
                // var displayComputerScissors = "PLAYER ONE WINS";
                // document.querySelector("#playerTwoGuess").innerHTML = displayComputerScissors; 
            }else if ((playerOneGuess == 'rock') && (playerTwoGuess == 'paper')){
                playerTwoWinsCnt++;
                playerOneLossesCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'rock')){
                playerTwoWinsCnt++;
                playerOneLossesCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
            }else if ((playerOneGuess == 'scissors') && (playerTwoGuess == 'paper')){
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                });
            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'rock')){
                playerOneWinsCnt++;
                playerTwoLossesCnt++;
                myDataRef.child("players/1/").update({
                  wins: playerOneWinsCnt
                }); 
                myDataRef.child("players/2/").update({
                  losses: playerTwoLossesCnt
                });
            }else if ((playerOneGuess == 'paper') && (playerTwoGuess == 'scissors')){
                playerOneLossesCnt++;
                playerTwoWinsCnt++;
                myDataRef.child("players/1/").update({
                  losses: playerOneLossesCnt
                }); 
                myDataRef.child("players/2/").update({
                  wins: playerTwoWinsCnt
                });
            };
        });
    };

    // Chat feature
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