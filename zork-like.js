"use strict";

// Element grabbing -------------------------------------
const text = document.querySelector('h1');
const startButton = document.querySelector('button');
const startScreen = document.querySelector('#start-screen');
const gameText = document.querySelector('.game-text');
const gameTextPlain = document.querySelector('.plain-text')
const hintElement = document.querySelector('.hint-text');
const start = [0,0];
let currentLocation = start;
let Playerinput = document.querySelector('.playerInput');

// Functions --------------------------------------------

const inputTester = function(input, verbs, objirections) {
    const splitInput = String(input).toLowerCase().split(" ");
    if (verbs.includes(splitInput[0])) {
        if (objirections.includes(splitInput[1])) {
            console.log('You\'re up!');
        } else console.log(`"${splitInput[1]}" is not a valid direction or object, please try again`);
    } else console.log(`Cannot recognise "${input}", please type a verb followed by a direction`);
}


// GAME MAP/GRID

// Array creator function
const arrayCreator = function(xStart, xEnd) {
    const xCoords = [];
    for (let i=xStart; i<=xEnd; i++) {
        xCoords.push(i);
    }
    return xCoords;
};

// console.log(arrayCreator(-2, 2)); 

const xCoords = arrayCreator(-2, 2); // (5x5) CHANGE THIS IF NEEDED BIGGER MAP/GRID


const mapArr = xCoords.flatMap(function(x) {
    const xArr = [];
    for (let j=0; j<5; j++) {
        xArr.push([x, xCoords[j]]);
    }
    return xArr
});
// console.log(mapArr);


const allGameText = [{plainText: '1', hint: ''}, {plainText: '2', hint: ''}, {plainText: '3', hint: ''}, {plainText: '4', hint: ''}, {plainText: '5', hint: ''}, {plainText: '6', hint: ''}, {plainText: '7', hint: ''}, {plainText: '8', hint: ''}, {plainText: '9', hint: ''}, {plainText: '10', hint: ''}, {plainText: '11', hint: ''}, {plainText: '12', hint: ''}, {plainText: `You wake up in an empty office. You are lying on a long conference table. You feel weak. But you `, hint: 'tell yourself to get up.'}, {plainText: '13', hint: ''}, {plainText: '14', hint: ''}, {plainText: '15', hint: ''}, {plainText: '16', hint: ''}, {plainText: '17', hint: ''}, {plainText: '18', hint: ''}, {plainText: '19', hint: ''}, {plainText: '20', hint: ''}, {plainText: '21', hint: ''}, {plainText: '22', hint: ''}, {plainText: '23', hint: ''}, {plainText: '24', hint: ''}, {plainText: '25', hint: ''}];


const allGameTextMap = new Map(mapArr.map((coords, index) => [String(coords), allGameText[index]]));






// Title grow/shrink effect
const emphasizeTitle = function (e) {
    text.style.fontSize = '80px';
    text.style.letterSpacing = '0.075cm'
};

const defaultTitle = function(e) {
    text.style.fontSize = '70px';
    text.style.letterSpacing = 'normal'
};


// hide title screen & show game intro text
const beginning = function(e) {
    startScreen.style.opacity = '0%';
    gameTextPlain.textContent = allGameTextMap.get(String(currentLocation))['plainText'];
    hintElement.textContent = allGameTextMap.get(String(currentLocation))['hint'];
    // console.log(hintElement.textContent);
    setTimeout(function() { 
        startScreen.style.display = 'none';
        gameText.style.display = 'block';
        setTimeout(function() {
            gameText.style.opacity = '100';
            Playerinput.style.display = 'block';
            Playerinput.focus();
        }, 1500);
    }, 1500); // wait until transition is complete
};


// Event Listeners ---------------------------------------
startButton.addEventListener('mouseenter', emphasizeTitle);
startButton.addEventListener('mouseleave', defaultTitle);

// Start game
startButton.addEventListener('click', beginning);



// User input
let currentInput;
document.addEventListener('keypress', (e) => {
    const name = e.key;
    const code = e.code;
    if (name === "Enter") {
        e.preventDefault();
        currentInput = Playerinput.value;
        inputTester(currentInput, ['get'], ['up']);
        Playerinput.value = ""; // clear input field
    }
})


