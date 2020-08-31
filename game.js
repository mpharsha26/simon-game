var gameStart = false;
var levelNo = 1;
var colors = ['green', 'red', 'yellow', 'blue'];
var seq = [];
$(document).keypress(function(event){
    $('h1').text('Level ' + levelNo);
    getSeq(levelNo);
    $.each(seq, function (i, num){
        $("." + colors[num]).delay(i * 100).addClass('pressed', 100).removeClass('pressed', 100, function(){
            makeSound(colors[num]);
        });
    });
    // seq.forEach(function(num){
    //     $("." + colors[num]).addClass('pressed', 100).removeClass('pressed', 100, function(){
    //         makeSound(colors[num]);
    //     });
    //     // $("#" + colors[num]).addClass("pressed");
    //     // setTimeout(function () {
    //     //     $("#" + colors[num]).removeClass("pressed");
    //     // }, 100);
    //     //makeSound(colors[num]);
    // });
    levelNo += 1;
});
   
function gameOver(){

}

function getSeq(levelNo){
    var randomNo = Math.floor(Math.random() * 4);
    seq.push(randomNo);
}

function makeSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
}

