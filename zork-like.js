"use strict";

// Element grabbing -------------------------------------
const text = document.querySelector('h1');
const startButton = document.querySelector('button');
const startScreen = document.querySelector('#start-screen');
const gameText = document.querySelector('.game-text');
const allText = document.querySelector('.text');
const gameTextPlain = document.querySelector('.plain-text');
const hintElement = document.querySelector('.hint-text');
const start = [0, 0];
let currentLocation = start;
let playerInput = document.querySelector('.playerInput');
let pockets = ['blank yellow keycard'];




// BIG Array of objects

const allGameText = [{
    plainText: '1',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
    {
    plainText: '2',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '3',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '4',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '5',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '6',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '7',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '8',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '9',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '10',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '11',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '12',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: `You wake up in an empty office. You are lying on a long conference table. You feel weak. But you `,
    hint: 'tell yourself to get up.',
    transitionText: '',
    answers: [['get', 'up']],
    direction: '',
    gateways: []},
 {
    plainText: 'The only thing in here besides the table and chairs is a painting of [INSERT TEXT HERE]. To your right there is a reinforced metal door with a keycard lock. Instinctively you ',
    hint: 'check your pockets...',
    transitionText: 'You drag yourself off the table and look around you',
    answers: [['swipe', 'keycard']],
    direction: '',
    gateways: []},
 {
    plainText: '14',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '15',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '16',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '17',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '18',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '19',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '20',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '21',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '22',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '23',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '24',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []},
 {
    plainText: '25',
    hint: '',
    transitionText: '',
    answers: [],
    direction: '',
    gateways: []}];

// Functions --------------------------------------------

// GAME MAP/GRID

// Array creator function
const arrayCreator = function(xStart, xEnd) {
    const xCoords = [];
    for (let i=xStart; i<=xEnd; i++) {
        xCoords.push(i);
    }
    return xCoords;
};

const xCoords = arrayCreator(-2, 2); // (5x5) CHANGE THIS IF NEEDED BIGGER MAP/GRID

const mapArr = xCoords.flatMap(function(x) {
    const xArr = [];
    for (let j=0; j<5; j++) {
        xArr.push([x, xCoords[j]]);
    }
    return xArr
});

const allGameTextMap = new Map(mapArr.map((coords, index) => [String(coords), allGameText[index]]));

const find = (property) => allGameTextMap.get(String(currentLocation))[property];


// Pockets

// TO DO: add html div similar to instruct msg but maybe have items in blue? to tell player inventory
const checkPockets = function() {
    const pocketsMsg = (pockets.length === 0) ? `Your pockets are empty` : `You check your pockets and find a ${pockets[0]}`;
    if (pockets.length > 1) {
        for (let i=1; i<pockets.length-1; i++) {
            pocketsMsg += `, a ${pockets[i]}`
        }
    pocketsMsg += `${pockets[-1]}`;
    }
    console.log(pocketsMsg);
};


// Big LOGIC -------------------------------------------------------

const inputTester = function(input, [verbs, objirections], direction) {
    const splitInput = String(input).toLowerCase().split(" ");
    if (input.toLowerCase().trim() === 'check pockets') {
        checkPockets();
    } else {
        if (verbs.includes(splitInput[0])) {
            if (objirections.includes(splitInput[1])) {
                    if (!(find('answers').length === 1)) {
                        console.log('not done yet');
                        allGameTextMap.get(String(currentLocation))['answers'].shift();
                    } else {
                        // continue
                        playerInput.blur();
                        [...allText.children].forEach((el) => el.style.opacity = 0);
                        currentLocation[1] += 1;
                        setTimeout(function() {
                            // remove all added instructions
                            document.querySelectorAll('.added').forEach((el) => el.remove())
                            addTransitionText();
                            setGameText();
                            setTimeout(function() { // game (story) text appears last
                            gameText.style.opacity = 100;
                            playerInput.focus();
                            }, 3500);
                        }, 1500);
                    };
            } else addInstruction(`\n "${splitInput[1]}" is not a valid direction or object, please try again`);
        } else addInstruction(`Cannot recognise "${input}", please type a verb followed by a direction or object`);
};
};

// ----------------------------------------------------------------------

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
    const newH2 = document.createElement('h2');
    newH2.classList.add('transition');
    newH2.classList.add('added');
    const addedText = document.createTextNode(find('transitionText'));
    newH2.appendChild(addedText);
    allText.insertAdjacentElement("afterbegin", newH2);
    const transitionText = document.querySelector('.transition');
    transitionText.style.display = 'block';
    setTimeout(function() {
        transitionText.style.opacity = 100;
    }, 1500);
}


// Title grow/shrink effect
const emphasizeTitle = function (e) {
    text.style.fontSize = '80px';
    text.style.letterSpacing = '0.075cm'
};

const defaultTitle = function(e) {
    text.style.fontSize = '70px';
    text.style.letterSpacing = 'normal'
};


const setGameText = function() {
    gameTextPlain.textContent = find('plainText');
    hintElement.textContent = find('hint');
    allText.style.opacity = 100;
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
            playerInput.style.display = 'block';
            playerInput.focus();
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
        currentInput = playerInput.value;
        inputTester(currentInput, find('answers')[0], find('direction'));
        playerInput.value = ""; // clear input field
    }
})

document.addEventListener('click', function() {
    playerInput.focus();
});