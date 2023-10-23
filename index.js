var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level = 0;
var started = false;

//user click
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, 
    //passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    gamePattern.push(randomChosenColour);
}

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("correct");
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },
            1000);
        }
    }
    else{
        console.log("wrong");
        $(document.body).addClass("game-over");
        playSound("wrong")
        setTimeout(function(){
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $(document.body).removeClass("game-over");
        },
        200);
        startOver();
    }
    
}

function startOver(){
    level=0;
    gamePattern =[];
    started = false;
}