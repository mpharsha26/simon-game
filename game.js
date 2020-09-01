var gameStart = false,
    levelNo = 1,
    colors = ['green', 'red', 'yellow', 'blue'],
    seq = [],
    userSeq = [],
    noOfClicks = 0;

$(document).keypress(function(event){
    if (gameStart == false){
        gameStart = true;
        $('h1').text('Level ' + levelNo);
        getSeq(1);
        //var i = 0;
        //noOfClicks = 0;                 
    
        displayAndPlaySequence(0)  // displaying the game sequence and playing the respective sounds
        
        //levelNo += 1;
    } 
});

$('.btn').click(function(){
    if (gameStart == true){
        noOfClicks++;
        var userClickedButton = $(this).attr('id')
        if (userClickedButton == colors[seq[noOfClicks - 1]]){
            console.log('working', noOfClicks);
            $(this).addClass('pressed', 100).removeClass('pressed', 50, function (){
                makeSound(userClickedButton);
                console.log(seq);
                if (noOfClicks == seq.length){
                     var i = 0;
                     getSeq(levelNo);
                     displayAndPlaySequence(i)
                     levelNo += 1;
                     $('h1').text('Level  ' + levelNo);
                     noOfClicks = 0;
                 }
            });
            // animateButton($(this));
        }
        else {
            console.log(userClickedButton, noOfClicks);
            gameOver();
            restartGame();
        }
    }
});

function displayAndPlaySequence(i) {         
    setTimeout(function() {   
        $("." + colors[seq[i]]).addClass('pressed', 80).removeClass('pressed', 80, function(){
            makeSound(colors[seq[i]]);
            i++;
            if (i < seq.length)          
            displayAndPlaySequence(i);
        });                                              
    }, 300);
}

// function animateButton(button){
//     $(button).addClass('pressed', 100).removeClass('pressed', 100, function (){
//         makeSound(button.attr('id'));
//     });
// }

function restartGame(){
    levelNo = 1;
    seq = [];
    noOfClicks = 0;
}

function gameOver(){
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $('h1').text('Game over 😩 Press any key to restart');
    $('body').addClass('gameover', 10).removeClass('gameover', 500);
    gameStart = false;
}

function getSeq(levelNo){
    var randomNo = Math.floor(Math.random() * 4);
    seq.push(randomNo);
}

function makeSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
}

