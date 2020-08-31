var gameStart = false;

if (gameStart == false) {
    $(document).keypress(function (event){
        console.log(event.key);
        $("h1").text('Level 1');
        makeSound('blue');
    });
    gameStart = true;
}


function makeSound(color){
    var sound = new Audio('sounds/' + color + '.mp3');
    sound.play();
};

