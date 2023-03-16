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

let pockets = [
    {
        names: ['keycard', 'card'],
        text: 'blank yellow keycard'
    }, 
    {
        names: ['wallet'],
        text: 'leather wallet'
    },
    { 
        names: ['donut'],
        text: 'sugar strand donut'
    }
];

let checked = false;

const directionMap = new Map();
directionMap.set('n', [1, 1]);
directionMap.set('e', [0, 1]);
directionMap.set('s', [1, -1]);
directionMap.set('w', [0, -1]);

console.log(directionMap);

// BIG Array of ALL locations

// direction: [0, 1] = East, [0, -1] = West, [1, 1] = North, [1, -1] = South 

// Remember inputTester checks against first element of Answers first so this can be a gateway to next part of same room.

// TO DO: Requirements should work like checks. e.g if a location has a gateway e.g 'keycard', the input tester should account for this

const allGameText = [{
    plainText: '1',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
    {
    plainText: '2',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '3',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '4',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '5',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '6',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '7',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '8',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '9',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '10',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '11',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '12',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: `You wake up in an empty office. You are lying on a long conference table. You feel weak. But you `,
    hint: 'tell yourself to get up.',
    transitionText: '',
    answers: [[['get', 'wake'], ['up']]],
    directions: [[1, 1]],
    requirements: []},
 {
    plainText: 'The only thing in here besides the table and chairs is a painting of [INSERT TEXT HERE]. To your right there is a reinforced metal door with a keycard lock. Instinctively you ',
    hint: 'check your pockets...',
    transitionText: 'You drag yourself off the table and look around the room',
    answers: [[['swipe', 'use'], ['keycard', 'card']]],
    directions: [[0, 1]],
    requirements: ['keycard', 'card']},
 {
    plainText: '',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '15',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '16',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '17',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: 'You walk into a corridor. You can go ',
    hint: 'North, or South.',
    transitionText: 'You swipe the yellow keycard, the door clanks open.',
    answers: [[['go', 'walk'], ['north', 'south']]],
    directions: [[1, 1], [1, -1]],
    requirements: []},
 {
    plainText: '19',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '20',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '21',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '22',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '23',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '24',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []},
 {
    plainText: '25',
    hint: '',
    transitionText: '',
    answers: [],
    directions: [],
    requirements: []}];

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

console.log(allGameTextMap);

const find = (property) => allGameTextMap.get(String(currentLocation))[property];


// Pockets

// TO DO: add html div similar to instruct msg but maybe have items in blue? to tell player inventory
// const checkPockets = function() {
//     let pocketsMsg = (pockets.length === 0) ? `Your pockets are empty` : `You check your pockets and find a ${pockets[0]}`;
//     if (pockets.length > 1) {
//         for (let i=1; i<pockets.length-1; i++) {
//             console.log(i);
//             pocketsMsg += `, a ${pockets[i]}`
//         }
//     pocketsMsg += ` and a ${pockets.slice(-1)}`;
//     }
//     addInvEl(pocketsMsg, 'div', 'inv', gameText);
// };

const checkPockets = function() {
    const pocketsMsg = (pockets.length === 0) ? `Your pockets are empty` : `You check your pockets and find a `;
    addInvEl(pocketsMsg, 'div', 'firstInvText', gameText);
    const firstInvText = document.querySelector('.firstInvText');
    addInvEl(`${pockets[0]['text']}`, 'span', 'invItem', firstInvText);
    if (pockets.length > 1) {
        for (let i=1; i<pockets.length-1; i++) {
            addInvEl(`, a `, 'span', 'invText', firstInvText);
            addInvEl(`${pockets[i]['text']}`, 'span', 'invItem', firstInvText);
        };
    addInvEl(` and a `, 'span', 'invText', firstInvText);
    addInvEl(`${pockets.at(-1)['text']}`, 'span', 'invItem', firstInvText);
    }
    checked = true;
}


// Big LOGIC -------------------------------------------------------

// NEEDS REFACTORING

const inputTester = function(input, [verbs, objirections], directions) {
    const splitInput = String(input).toLowerCase().split(" ");
    if ((input.toLowerCase().trim() === 'check pockets')) {
        if (checked) return;
        checkPockets();
    } else {
        if (verbs.includes(splitInput[0])) {
            if (objirections.includes(splitInput[1])) {
                // GATEWAYS
                    if (!(find('answers').length === 1)) {
                        console.log('not done yet');
                        find('answers').shift();
                    } else {
                        if ((!(find('requirements').includes(splitInput[1]))) || pockets.some((item) => item['names'].includes(splitInput[1]))) { ///// HELP
                            // CONTINUE
                            playerInput.blur();
                            [...allText.children].forEach((el) => el.style.opacity = 0);
                            if (directions.length === 1) {
                                let index = directions[0][0];
                                let num = directions[0][1];
                                currentLocation[index] += num 
                            } else { // direction must be a choice
                                const coords = directionMap.get(splitInput[1].slice(0,1).toLowerCase());
                                currentLocation[coords[0]] += coords[1];
                            }
                            console.log(currentLocation);
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
                        checked = false;
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
};

const addInvEl = function(msg, el, className, parent) {
    const newEl = document.createElement(el);
    newEl.classList.add(className);
    newEl.classList.add('added');
    const addedText = document.createTextNode(msg);
    newEl.appendChild(addedText)
    parent.insertAdjacentElement("beforeend", newEl);
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
        inputTester(currentInput, find('answers')[0], find('directions'));
        playerInput.value = ""; // clear input field
    }
})

document.addEventListener('click', function() {
    playerInput.focus();
});

