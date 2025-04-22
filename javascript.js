let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level=0;
let started=false;
function animatePress(currentColor) { 
    $("#" + currentColor).fadeOut(100).fadeIn(100);
}; 

function playSound(audio){
    var audio1 = new Audio("./sounds/" + audio + ".mp3");
    audio1.play();
}

function restartGame(){
    gamePattern=[];
    level=0;
    started=false;
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);   
    playSound(randomChosenColor);  
 
}

function checkAnswer(CurrentLevel){
    if(gamePattern[CurrentLevel]===userClickedPattern[CurrentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over! Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        restartGame();
    }

}

$(".btn").on("click", function() {
     
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    if(userChosenColor){
        animatePress(userChosenColor);
    }   
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);    
});
$(document).on("keydown", function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
    
});



    