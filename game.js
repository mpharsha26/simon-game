var gameStart = false,
    levelNo = 1,
    colors = ['green', 'red', 'yellow', 'blue'],
    seq = [],
    userSeq = [],
    noOfClicks = 0;

$(document).keypress(function(event){
    if (gameStart == false){
        gameStart = true; // restricting any keypresses after game starts
        $('h1').text('Level ' + levelNo);
        getSeq(1); // generate the first random sequence
        displayAndPlaySequence(0)  // animate the generated first color 
    } 
});

// event listeners to the color buttons
$('.btn').click(function(){
    if (gameStart == true){
        noOfClicks++;
        var userClickedButton = $(this).attr('id') // color which was clicked by the user
        if (userClickedButton == colors[seq[noOfClicks - 1]]){
            //console.log('working', noOfClicks);
            $(this).addClass('pressed', 100).removeClass('pressed', 50, function (){
                makeSound(userClickedButton);
                // condition to check if user has completed a level successfully
                if (noOfClicks == seq.length){ 
                     getSeq(levelNo); // adds a new random color to the end of the sequence
                     displayAndPlaySequence(0) // animation stuff on the colors in the sequence 
                     levelNo += 1;
                     $('h1').text('Level  ' + levelNo);
                     noOfClicks = 0;
                 }
            });
        }
        else {
            console.log(userClickedButton, noOfClicks);
            gameOver();
            restartGame();
        }
    }
});

//displays the game sequence and plays respective sound
function displayAndPlaySequence(i) {         
    setTimeout(function() {   // used to get a delay between successive colors
        $("." + colors[seq[i]]).addClass('pressed', 80).removeClass('pressed', 80, function(){
            makeSound(colors[seq[i]]);
            i++;
            if (i < seq.length)       
            // recursion code has to be within the callback to experience the real delay   
            displayAndPlaySequence(i);  
        });                                              
    }, 300);
}


function restartGame(){
    levelNo = 1;
    seq = [];
    noOfClicks = 0;
}

function gameOver(){
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $('h1').text('Game over 😩 Press any key to restart');
    $('body').addClass('game-over', 10).removeClass('game-over', 500);
    gameStart = false; // activating the keypress listener again by setting this to false
}

function getSeq(levelNo){
    var randomNo = Math.floor(Math.random() * 4); // generate a random color 
    seq.push(randomNo); 
}

function makeSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
}

