"use strict";

// Element grabbing -------------------------------------
const text = document.querySelector('h1');
const startButton = document.querySelector('button');
const startScreen = document.querySelector('#start-screen');
const gameText = document.querySelector('.game-text');
const start = [0,0];

// Functions --------------------------------------------


// Game map/grid 

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


const allGameText = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'You wake up in an empty office...', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']


const allGameTextMap = new Map(mapArr.map((coords, index) => [String(coords), allGameText[index]]));

// console.log(allGameTextMap.get('0,0'));




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
    gameText.textContent = allGameTextMap.get('0,0')
    setTimeout(function() { 
        startScreen.style.display = 'none';
        gameText.style.display = 'block';
        setTimeout(function() {
            gameText.style.opacity = '100';
        }, 1500);
    }, 1500); // wait until transition is complete
};


// Event Listeners ---------------------------------------
startButton.addEventListener('mouseenter', emphasizeTitle);
startButton.addEventListener('mouseleave', defaultTitle);

// Start game
startButton.addEventListener('click', beginning);