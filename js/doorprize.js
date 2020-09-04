/**
 * Name: Gus McCoy
 * Class: Comp 250
 * Search on Taz- taz.harding.edu/~jmccoy5/DoorPrize5416
 * Extra Easter Egg for you Dr. McCown! Make the racers' names be
 * "Dr. McCown", "should", "give", "Gus", "an", "A" :)
 * Please forgive the sloppiness of the Easter Egg, it wasn't a
 * priority obviously. :)
 */


var finalContestantArray = []; 
var racers = [" ", " ", " ", " ", " "];
var timerId;
var EEtimerId;
var winnerNum;
var racersProgress = [0, 0, 0, 0, 0];
var thisRacer = 0;
var easterEgg = false;
var winnerPic = new Image();

function finishedLoading() {
  
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", firstPageActions);

    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", sendToLocalStorage);

    var loadButton = document.getElementById("loadButton");
    loadButton.addEventListener("click", loadSavedNames);

    var cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener("click", switchScreen);

    var raceButton = document.getElementById("raceButton");
    raceButton.addEventListener("click", switchScreen);

    var newRaceButton = document.getElementById("newRaceButton");
    newRaceButton.addEventListener("click", switchScreen);
}

function firstPageActions(event) {
    var pushedButton = event;
    var audio = document.getElementById("DSExplode");
    audio.pause();
    var audio1 = document.getElementById("EEWinnerSound");
    audio.pause();
    var audio = document.getElementById("openingTheme");
    audio.play();
    var nameBox = document.getElementById("names");
    var contestantArray = [];
    for (let i = finalContestantArray - 1; i >= 0; i--) {
        finalContestantArray[i].pop();
    }
    contestantArray = nameBox.value.split('\n');

    for (let i = 0; i < contestantArray.length; i++) {
        contestantArray[i] = contestantArray[i].trim();
    }

    finalContestantArray = [];

    for (let i = 0; i < contestantArray.length; i++) {
        if (contestantArray[i] != " " && contestantArray[i] != "" && contestantArray[i] != '\n') {
            finalContestantArray.push(contestantArray[i]);
        }
    }
    if (finalContestantArray.length < 6) {
        alert("Must have at least 6 racers to choose from! Enter more!");
        for (let i = finalContestantArray.length - 1; i >= 0; i--) {
            finalContestantArray = [];
        }
    }
    else {
        assignRacers();
        switchScreen(pushedButton);
        displayRacers();
    }
}

function sendToLocalStorage() {
    var nameBox = document.getElementById("names");

    if (nameBox.value != "") {
        var LSnames = names.value;
        localStorage.savedNames = LSnames;
    }
}

function loadSavedNames() {
    var nameBox = document.getElementById("names");
    var loadedLocalStorageStr = localStorage.savedNames;

    names.value = names.value + '\n' + loadedLocalStorageStr;

}

function assignRacers() {
    var racerNum = [0, 0, 0, 0, 0];
    let i = 0;
    var max = finalContestantArray.length - 1;
    for (; i < 5; i++) {
        racerNum[i] = Math.floor(0 + Math.random() * max);
    }
    while (racerNum[1] === racerNum[0])
        racerNum[1] = Math.floor(0 + Math.random() * max);

    while (racerNum[2] === racerNum[0] || racerNum[2] === racerNum[1])
        racerNum[2] = Math.floor(0 + Math.random() * max);

    while (racerNum[3] === racerNum[0] || racerNum[3] === racerNum[1] || racerNum[3] === racerNum[2])
        racerNum[3] = Math.floor(0 + Math.random() * max);

    while (racerNum[4] === racerNum[0] || racerNum[4] === racerNum[1] || racerNum[4] === racerNum[2] || racerNum[4] === racerNum[3])
        racerNum[4] = Math.floor(0 + Math.random() * max);

    for (let j = 0; j < 5; j++) {
        racers[j] = finalContestantArray[racerNum[j]];
    }
    findEasterEgg();
}

function switchScreen(event) {
    var pushedButton = event.target.id;

    if (pushedButton === "cancelButton") {
        document.getElementById("contestantScreen").style.display = "none";
        document.getElementById("attendanceScreen").style.display = "block";
    }
    else if (pushedButton === "raceButton") {
        document.getElementById("contestantScreen").style.display = "none";
        document.getElementById("raceScreen").style.display = "block";
        if (!easterEgg)
            normalRace();
        else
            EERace();
    }
    else if (pushedButton === "submitButton") {

        document.getElementById("attendanceScreen").style.display = "none";
        document.getElementById("contestantScreen").style.display = "block";
    }
    else if (pushedButton === "newRaceButton") {
        document.getElementById("winnerScreen").style.display = "none";
        document.getElementById("attendanceScreen").style.display = "block";
    }
}

function normalRace() {
    displayRacersForRace();
    setTimeout(raceManager, 2000);
}

function EERace() {
    displayEasterEggRacers();
    EEtimerId = setInterval(easterEggRace, 100);
    setTimeout(stopRace, 6000);
}

function displayRacers() {

    for (let i = 0; i < 5; i++) {
        var currentRacer = document.getElementById("r" + (i + 1));
        currentRacer.innerHTML = ('<img src="xwing' + (i + 1) + '.png" alt="' + racers[i] + '" width="100" height="63" /><br>' + racers[i]);
        currentRacer.style.position = "absolute";
        currentRacer.style.left = (150 * i) + "px";
        currentRacer.style.top = "400px";
    }
}

function displayRacersForRace() {

    for (let i = 0; i < 5; i++) {
        var currentRacer = document.getElementById("racer" + (i + 1));
        currentRacer.innerHTML = ('<img src="xwing' + (i + 1) + '.png" alt="' + racers[i] + '" width="100" height="63" /><br><br>' + racers[i]);
        currentRacer.style.display = "block";
        currentRacer.style.position = "absolute";
        currentRacer.style.left = "0px";
        currentRacer.style.top = (115 * i) + "px";
    }
}

function race() {

    var raceDistance = 0;
    for (let i = 0; i < 5; i++) {
        raceDistance = Math.floor(5 + Math.random() * 25);
        racersProgress[i] += raceDistance;

        document.getElementById("racer" + (i + 1)).style.left = racersProgress[i] + "px";

        if (racersProgress[thisRacer] >= 750) {
            var audio1 = document.getElementById("watchOut");
            audio1.play();
            var audio = document.getElementById("tieSound");
            audio.play();
            document.getElementById("killOff").style.display = "block";
            document.getElementById("tieFighter").style.display = "none";
            document.getElementById("racer" + (thisRacer + 1)).style.display = "none";
            setTimeout(clearExplosion, 500);
            racersProgress[thisRacer] = 0;
        }
        if (racersProgress[i] > (.95 * document.body.clientWidth)) {
            winnerNum = i;
            clearInterval(timerId);
            setTimeout(showWinner, 2000);
        }
    }
}

function spawnTieFighter() {
    thisRacer = Math.floor(0 + Math.random() * 4);
    var tieFighter = document.getElementById("tieFighter");
    tieFighter.innerHTML = '<img src="sneakAttack.png" alt="tieFighter" width="100" height="63" />';
    tieFighter.style.position = "absolute";
    tieFighter.style.left = "750px";
    tieFighter.style.top = (130 * thisRacer) + "px";
    tieFighter.style.zIndex = "2";
    tieFighter.style.display = "block";

    var expolsion = document.getElementById("killOff");
    expolsion.style.position = "absolute";
    expolsion.style.left = "750px";
    expolsion.style.top = (130 * thisRacer) + "px";
    expolsion.style.zIndex = "1";
}

function clearExplosion() {
    document.getElementById("killOff").style.display = "none";
}

function raceManager() {
    var audio = document.getElementById("raceSound");
    audio.play();
    timerId = setInterval(race, 100);
    setTimeout(spawnTieFighter, 3500);
}

function showWinner() {
    var audio1 = document.getElementById("openingTheme");
    audio1.pause();
    var audio = document.getElementById("DSExplode");
    audio.play();

    document.getElementById("raceScreen").style.display = "none";
    for (let i = 0; i < 5; i++) {
        var currentRacer = document.getElementById("racer" + (i + 1));
        currentRacer.style.left = "0px";
        currentRacer.style.top = (150 * i) + "px";
        racersProgress[i] = 0;
    }
    
    document.getElementById("winnerScreen").style.display = "block";
    document.getElementById("podium").innerHTML = '<img src="deathStarExp.gif" alt="victory"><br><img src="xwing' + (winnerNum + 1) + '.png" alt="' + racers[winnerNum] + '" width="200" height="150" /><br>' + "You've saved the Rebellion, " + racers[winnerNum] + "!";
    
}


function easterEggRace() {
    if (easterEgg) {
       displayEasterEggRacers();
    }
    var raceDistance = 0;
    var audio = document.getElementById("tieSound");
    audio.play();

    for (let i = 0; i < 5; i++) {
        raceDistance = Math.floor(5 + Math.random() * 25);
        racersProgress[i] += raceDistance;

        document.getElementById("racer" + (i + 1)).style.left = racersProgress[i] + "px";

        if (racersProgress[i] >= 750) {
            document.getElementById("killOff" + (i + 1)).style.display = "block";
            document.getElementById("tieFighter" + (i + 1)).style.display = "none";
            document.getElementById("racer" + (i + 1)).style.display = "none";
        }
    }
    easterEgg = false;
}

function displayEasterEggRacers() {

    for (let i = 0; i < 5; i++) {
        var currentRacer = document.getElementById("racer" + (i + 1));
        currentRacer.innerHTML = ('<img src="xwing' + (i + 1) + '.png" alt="' + racers[i] + '" width="100" height="63" /><br><br>' + racers[i]);
        currentRacer.style.display = "block";
        currentRacer.style.position = "absolute";
        currentRacer.style.left = "0px";
        currentRacer.style.top = (115 * i) + "px";
        
        var tieFighter = document.getElementById("tieFighter" + (i + 1));
        tieFighter.style.top = (115 * i) + "px";
        tieFighter.style.display = "block";
        var expolsion = document.getElementById("killOff" + (i + 1));
        expolsion.style.top = (115 * i) + "px";
    }
}

function stopRace() {
    for (let i = 0; i < 5; i++)
        document.getElementById("killOff" + (i+1)).style.display = "none";

        clearInterval(EEtimerId);
        setTimeout(easterEggShowWinner, 2000); 
}

function easterEggShowWinner() {
    var audio1 = document.getElementById("openingTheme");
    audio1.pause();
    var audio = document.getElementById("EEWinnerSound");
    audio.play();

    document.getElementById("raceScreen").style.display = "none";
    for (let i = 0; i < 5; i++) {
        var currentRacer = document.getElementById("racer" + (i + 1));
        currentRacer.style.left = "0px";
        currentRacer.style.top = (150 * i) + "px";
        racersProgress[i] = 0;
    }
    for (let i = 0; i < 5; i++)
        racersProgress[i] = 0;

    document.getElementById("winnerScreen").style.display = "block";
    document.getElementById("podium").innerHTML = '<img src="eeWinner.gif" alt="defeat"><br><img src="sneakAttack.png" alt="Winner" width="200" height="150" /><br>' + "The Dark Side reigns supreme!";
}

function findEasterEgg() {
    if (finalContestantArray[0] !== "Dr. McCown")
        easterEgg = false;
    else if (finalContestantArray[1] !== "should")
        easterEgg = false;
    else if (finalContestantArray[2] !== "give")
        easterEgg = false
    else if (finalContestantArray[3] !== "Gus")
        easterEgg = false;
    else if (finalContestantArray[4] !== "an")
        easterEgg = false;
    else if (finalContestantArray[5] !== "A")
        easterEgg = false;
    else
        easterEgg = true;
}

window.addEventListener("DOMContentLoaded", finishedLoading);