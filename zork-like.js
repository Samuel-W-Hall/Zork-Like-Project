"use strict";

// Element grabbing -------------------------------------
const text = document.querySelector('h1');
const startButton = document.querySelector('button');
const startScreen = document.querySelector('#start-screen');
const gameText = document.querySelector('.game-text');
const gameTextPlain = document.querySelector('.plain-text')
const hintElement = document.querySelector('.hint-text');
const start = [0, 0];
let currentLocation = start;
let Playerinput = document.querySelector('.playerInput');
let pockets = [];

// Functions --------------------------------------------

const inputTester = function(input, [verbs, objirections], direction) {
    const splitInput = String(input).toLowerCase().split(" ");
    if (verbs.includes(splitInput[0])) {
        if (objirections.includes(splitInput[1])) {
            // get up
            gameText.style.opacity = 0;
            currentLocation[1] =+ 1;
            setTimeout(function() {
                // remove all added instructions
                document.querySelectorAll('.added').forEach((el) => el.remove())
                setGameText();
                addTransitionText();
                gameText.style.opacity = 100;
            }, 1500)
        } else addInstruction(`\n "${splitInput[1]}" is not a valid direction or object, please try again`);
    } else addInstruction(`Cannot recognise "${input}", please type a verb followed by a direction or object`);
};

// added instruction text
const addInstruction = function(instruction) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('instruction');
    newDiv.classList.add('added');
    const addedText = document.createTextNode(instruction);
    newDiv.appendChild(addedText)
    gameText.insertAdjacentElement("beforeend", newDiv);
}

const addTransitionText = function() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('transition');
    newDiv.classList.add('added');
    const addedText = document.createTextNode(allGameTextMap.get(String(currentLocation))['transitionText']);
    newDiv.appendChild(addedText);
    gameText.insertAdjacentElement("afterbegin", newDiv);
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


const allGameText = [{plainText: '1', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '2', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '3', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '4', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '5', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '6', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '7', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '8', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '9', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '10', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '11', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '12', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: `You wake up in an empty office. You are lying on a long conference table. You feel weak. But you `, hint: 'tell yourself to get up.', transitionText: '', answer: ['get', 'up'], direction: ''}, {plainText: 'The only thing in here besides the table and chairs is a painting of [INSERT TEXT HERE]. To your right there is a reinforced metal door with a keycard lock. Instinctively you ', hint: 'check your pockets...', transitionText: 'You drag yourself off the table and look around you', answer: ['check', 'pockets'], direction: ''}, {plainText: '14', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '15', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '16', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '17', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '18', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '19', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '20', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '21', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '22', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '23', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '24', hint: '', transitionText: '', answer: [], direction: ''}, {plainText: '25', hint: '', transitionText: '', answer: [], direction: ''}];


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

const find = (property) => allGameTextMap.get(String(currentLocation))[property];

const setGameText = function() {
    gameTextPlain.textContent = find('plainText');
    hintElement.textContent = find('hint');
}

// hide title screen & show game intro text
const beginning = function(e) {
    startScreen.style.opacity = '0%';
    // Set gametext
    setGameText();
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
        inputTester(currentInput, find('answer'), find('direction'));
        Playerinput.value = ""; // clear input field
    }
})


