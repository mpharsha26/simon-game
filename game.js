var gameStart = false;
var levelNo = 1;
var colors = ['green', 'red', 'yellow', 'blue'];
var seq = [];
var userSeq = [];
var noOfClicks;

$(document).keypress(function(event){
    $('h1').text('Level ' + levelNo);
    getSeq(levelNo);
    var i = 0;
    noOfClicks = 0;                 
   
    displayAndPlaySequence(i)  // displaying the game sequence and playing the respective sounds
    
    levelNo += 1;
    
});

$('.btn').click(function(){
    //console.log($(this).attr('id'), colors[seq[seq.length - 1]]);
    noOfClicks++;
    var userClickedButton = $(this).attr('id')
    if (userClickedButton == colors[seq[noOfClicks - 1]]){
        console.log('working', noOfClicks);
        $(this).addClass('pressed', 100).removeClass('pressed', 50, function (){
            makeSound(userClickedButton);
        });
        // animateButton($(this));
    }
    else {
        console.log(userClickedButton, noOfClicks);
        gameOver();
    }
});

function displayAndPlaySequence(i) {         
    setTimeout(function() {   
        $("." + colors[seq[i]]).addClass('pressed', 100).removeClass('pressed', 100, function(){
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

function gameOver(){
    var sound = new Audio('sounds/wrong.mp3');
    sound.play();
    $('h1').text('Game over 😩 Press any key to restart');
    $('body').addClass('gameover', 10).removeClass('gameover', 500);
}

function getSeq(levelNo){
    var randomNo = Math.floor(Math.random() * 4);
    seq.push(randomNo);
}

function makeSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
}

