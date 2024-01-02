
function runOnStart() {

    // "use strict";

    // console.log([1, 5, 3]);
    // console.log([1, 5, 3].sort((a,b) => a-b))
    // Element grabbing -------------------------------------
    const title = document.querySelector('h1');
    const startButton = document.querySelector('button');
    const startScreen = document.querySelector('#start-screen');
    const gameText = document.querySelector('.game-text');
    const allText = document.querySelector('.text');
    const gameTextPlain = document.querySelector('.plain-text');
    const hintElement = document.querySelector('.hint-text');
    const inputForm = document.querySelector('.input-form');

    // Initial values
    const start = [0, 0];
    let currentLocation = start;
    let playerInput = document.querySelector('#playerInput');
    let checked = false;
    let pockets = [
        {
            names: ['keycard', 'card'],
            text: 'blank yellow keycard'
        }, 
        // { 
        //     names: ['donut'],
        //     text: 'sugar strand donut'
        // },
        {
            names: ['compass'],
            text: 'compass'
        }
    ];

    // TODO: maybe work this into individual locations so directions can have specialised nicknames e.g directionMap.set([0, -1], ['west', 'cafeteria'])

    // maybe flip key/values
    const directionMap = new Map();
    directionMap.set('n', [1, 1]);
    directionMap.set('e', [0, 1]);
    directionMap.set('s', [1, -1]);
    directionMap.set('w', [0, -1]);

    /*
    TESTING AREA
    *changes to test ios mobile compatibility*




    */




    // direction: [0, 1] = East, [0, -1] = West, [1, 1] = North, [1, -1] = South 

    // Remember inputTester checks against first element of Answers first so this can be a gateway to next part of same room.

    // TODO: Requirements should work like checks. e.g if a DIRECTION has a gateway e.g 'keycard', the input tester should account for this

    // BIG Array of ALL locations
    const allGameText = [{
        html: `<span class="plain-text">1</span>`,
        transitionText: '',     // LOADS IN FIRST ONLY IF NOT BEEN HERE YET
        answers: [],            // (possibly only needs to be movement ans)
        findableObjects: [],    // TODO: get rid of????
        directions: [],         // TODO: think this needs refactoring
        requirements: [],       // TODO: combine with above???
        beenHere: [],           // BOOLEAN VALUE, COMPLETE
        gatewayFns: []          // MAP, more possibilities here?
    },
        {
            html: `<span class="plain-text">2</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">3</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">4</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">5</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">6</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">7</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">8</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">9</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: '<span class="plain-text">This is normal text with </span><span class="hint-text">Inserted Hint Text.</span><span class="plain-text"> Hope this works.</span>',
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">11</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">12</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">You wake up in an empty office. You are lying on a long conference table. You feel weak. But you </span><span class="hint-text">tell yourself to get up.</span>`,
        transitionText: '',
        answers: [[['get', 'wake'], ['up']]],
        findableObjects: [],
        directions: [[1, 1]],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">The only thing in here besides the table and chairs is a painting of [INSERT TEXT HERE]. To your right there is a reinforced metal door with a keycard lock. Instinctively you </span><span class="hint-text">check your pockets...</span>`,
        transitionText: 'You drag yourself off the table and look around the room',
        answers: [[['swipe', 'use'], ['keycard', 'card']]],
        findableObjects: [],
        directions: [[0, 1]],
        requirements: ['keycard', 'card'],
        beenHere: [],
        gatewayFns: new Map([[[['swipe', 'use'], ['keycard', 'card']], function(location) {
            addInstruction('A red light appears on the lock, you try swiping again');
            // Removing item from pockets
            // pockets = pockets.filter((obj) => {
            //     return !obj['names'].includes('card');
            // });
        }]])
    },
    {
        html: `<span class="plain-text">In the cafeteria you notice a clean dining table and a </span><span class="hint-text">gigantic fridge.</span><span class="plain-text"> You can go west, following signs to "Bathrooms" or east, towards "Maintenance"</span>`,
        transitionText: 'You open the door and walk into the cafeteria',
        answers: [[['go'], ['east', 'west']]],
        findableObjects: [],
        directions: [[0, 1], [0,-1]],
        requirements: ['west'],
        beenHere: [],
        gatewayFns: new Map([[[['look in', 'open'], ['fridge', 'refrigerator']], function(location) {
            addInstruction('The fridge opens, inside you find a lone metal key, [MORE DETAIL]...');
            pockets.push({
                names: ['key'],
                text: 'metal key'
            });
            if (checked === true) {
                document.querySelector('.invText').remove();
                checked = false;
            }
            location.requirements.splice(location.requirements.indexOf('west'), 1);
        }]])
    },
    {
        html: `<span class="plain-text">16</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">17</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">18</span>`,
        transitionText: '',
        answers: [[['go'], ['north']]],
        findableObjects: [],
        directions: [[1, 1]],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">[MORE DETAIL NEEDED] You find youself in a long corridor. You can go </span><span class="hint-text">North, or South.</span>`,
        transitionText: 'You swipe the yellow keycard, the door clanks open.',
        answers: [[['go', 'walk'], ['north', 'south']]],
        findableObjects: [],
        directions: [[1, 1], [1, -1]],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },

    {
        html: `<span class="plain-text">You reach the end of the corridor. There is a blue door to the west with a sign that reads "Cafeteria" and a red door to the east with a sign that reads "Maintenance". Or you can go South back down the corridor</span>`,
        transitionText: '',
        answers: [[['go'], ['south', 'west', 'east']]],
        findableObjects: [],
        directions: [[1, -1], [0, -1], [0, 1]],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">21</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">22</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">23</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">24</span>`,
        transitionText: '',
        answers: [],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    },
    {
        html: `<span class="plain-text">You are in the maintenance cupboard. There is nothing of interest in here. </span><span class="hint-text">Absolutely nothing</span>`,
        transitionText: '',
        answers: [[['go'], ['west']]],
        findableObjects: [],
        directions: [],
        requirements: [],
        beenHere: [],
        gatewayFns: []
    }];

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

    // console.log(allGameTextMap);

    const findProperty = (property) => allGameTextMap.get(String(currentLocation))[property];


    // Pockets

    const checkPockets = function() {
        const pocketsMsg = (pockets.length === 0) ? `Your pockets are empty` : `You check your pockets and find a `;
        // MIGHT NEED SOMETHING HERE when checking pockets AGAIN after picking something up (possibly doc.querSel('.invText').textContent = '' before its added again)
        addInvEl(pocketsMsg, 'div', 'invText', gameText);
        const invText = document.querySelector('.invText');
        addInvEl(`${pockets[0]['text']}`, 'span', 'invItem', invText);
        if (pockets.length > 1) {
            for (let i=1; i<pockets.length-1; i++) {
                addInvEl(`, a `, 'span', 'invWords', invText);
                addInvEl(`${pockets[i]['text']}`, 'span', 'invItem', invText);
            };
        addInvEl(` and a `, 'span', 'invWords', invText);
        addInvEl(`${pockets.at(-1)['text']}`, 'span', 'invItem', invText);
        }
        checked = true;
    }
    // Big LOGIC -------------------------------------------------------

    const pocketsSynonyms = ['check pockets', 'check pocket', 'look in pockets', 'look in pocket', 'pockets']

    // NEEDS REFACTORING
    // const inputTester = function(input, [verbs, objirections], directions) {
    //     const splitInput = String(input).toLowerCase().split(" ");
    //     if ((pocketsSynonyms.includes(input.toLowerCase().trim()))) {
    //         if (checked) return;
    //         checkPockets();
    //     } else {
    //         if (verbs.includes(splitInput[0])) {
    //             if (objirections.includes(splitInput[1])) {
    //                 // GATEWAYS
    //                 if ((!(find('requirements').includes(splitInput[1]))) || pockets.some((item) => item['names'].includes(splitInput[1]))) {
    //                     if (!(find('answers').length === 1)) {
    //                         // add gateway text?
    //                         console.log('not done yet');
    //                         find('gatewayFns')[0](); // calls gateway function
    //                         // add found objects to inventory?

    //                         find('answers').shift(); // IMPORTANT to remember this never removes directions as they are always the last element in the answers array
    //                     } else {
    //  ///// if the item/direction isn't "locked" in the requirements arr AND/OR said item/direction is in the players pockets then...
    //                             // !!! CONTINUE TO NEXT ROOM !!!
    //                             playerInput.blur();
    //                             // Remove all added text
    //                             [...allText.children].forEach((el) => el.style.opacity = 0);
    //                             // if there is only one direction choice
    //                             if (directions.length === 1) {
    //                                 let index = directions[0][0];
    //                                 let num = directions[0][1];
    //                                 currentLocation[index] += num 
    //                             } else { // direction must be a choice
    //                                 const coords = directionMap.get(splitInput[1].slice(0,1).toLowerCase());
    //                                 currentLocation[coords[0]] += coords[1];
    //                             }
    //                             console.log(currentLocation);
    //                             setTimeout(function() {
    //                                 // remove all added instructions
    //                                 document.querySelectorAll('.added').forEach((el) => el.remove())
    //                                 let timesBeenHere = find('beenHere').length;
    //                                 if (timesBeenHere === 0) {
    //                                     addTransitionText();
    //                                     find('beenHere').push('✅')
    //                                 };
    //                                 setGameText();
    //                                 setTimeout(function() { // game (story) text appears last
    //                                 gameText.style.opacity = 100;
    //                                 playerInput.focus();
    //                                 }, 3500);
    //                             }, 1500);
    //                         };
    //                         checked = false;
    //                     } else addInstruction(`LOCKED BY REQUIREMENTS ARRAY`);
    //             } else addInstruction(`\n "${splitInput[1]}" is not a valid direction or object, please try again`);
    //         } else addInstruction(`"${input}" is not a valid instruction at this time, please type a verb followed by either a direction or an object`);
    // };
    // };


    // use find('answers').slice[-1] to change location, use indexOf and answers.some(......) to check for any valid inputs which *do something* e.g open fridge. TLDR: make it so can travel to new location without having to open fridge
    // const inputTester = function(input, [verbs, objirections], directions) {
    //     const strInput = String(input).toLowerCase();
    //     if ((pocketsSynonyms.includes(input.toLowerCase().trim()))) {
    //         if (checked) return;
    //         checkPockets();
    //     } else {
    //         if (verbs.some((verb) => strInput.startsWith(verb))) {
    //             if (objirections.some((objirection) => strInput.endsWith(objirection))) {
    //                 // GATEWAYS
    //                 if ((!(find('requirements').some((req)=> strInput.endsWith(req)))) || pockets.some((item) => item['names'].some((itemName) => strInput.endsWith(itemName)))) {
    //                     if (!(find('answers').length === 1)) {
    //                         // add gateway text?
    //                         console.log('not done yet');
    //                         find('gatewayFns')[0](); // calls gateway function
    //                         // add found objects to inventory?

    //                         find('answers').shift(); // IMPORTANT to remember this never removes directions as they are always the last element in the answers array
    //                     } else {
    //  ///// if the item/direction isn't "locked" in the requirements arr AND/OR said item/direction is in the players pockets then...
    //                             // !!! CONTINUE TO NEXT ROOM !!!
    //                             playerInput.blur();
    //                             // Remove all added text
    //                             [...allText.children].forEach((el) => el.style.opacity = 0);
    //                             // if there is only one direction choice
    //                             if (directions.length === 1) {
    //                                 let index = directions[0][0];
    //                                 let num = directions[0][1];
    //                                 currentLocation[index] += num 
    //                             } else { // direction must be a choice
    //                                 const coords = directionMap.get(strInput.toLowerCase().split(" ").slice(-1)[0][0]);
    //                                 currentLocation[coords[0]] += coords[1];
    //                             }
    //                             console.log(currentLocation);
    //                             setTimeout(function() {
    //                                 // remove all added instructions
    //                                 document.querySelectorAll('.added').forEach((el) => el.remove())
    //                                 let timesBeenHere = find('beenHere').length;
    //                                 setGameText();
    //                                 if (timesBeenHere === 0) {
    //                                     addTransitionText();
    //                                     find('beenHere').push('✅')
    //                                     setTimeout(function() { // game (story) text appears last
    //                                         gameText.style.opacity = 100;
    //                                         playerInput.focus();
    //                                         }, 3000);
    //                                 } else makeGameTextVisible();
    //                             }, 1500);
    //                         };
    //                         checked = false;
    //                     } else addInstruction(`LOCKED BY REQUIREMENTS ARRAY`);
    //             } else addInstruction(`\n "${strInput.split(" ").slice(-1)}" is not a valid direction or object, please try again`);
    //         } else addInstruction(`"${input}" is not a valid instruction at this time, please type a verb followed by either a direction or an object`);
    // };
    // };


    // Reworked for just 2 arguments (doesn't work for 3+ word inputs)
    const inputTester = function(input, location) {
        let didSomething = false;
        // console.log(location);
        const strInput = String(input).toLowerCase();
        if ((pocketsSynonyms.includes(input.toLowerCase().trim()))) {
            if (checked) return;
            checkPockets();
        } else {
            const [verb, objirection] = strInput.split(" ");
            if (!(location.gatewayFns.size === 0)) {
                location.gatewayFns.forEach((value, key, map) => {
                    // console.log(key);
                    // console.log(key[0].includes(verb));
                    // console.log(key[1].includes(objirection));
                    if ((key[0].includes(verb)) && (key[1].includes(objirection))) { 
                        value(location); // Calls gateway function
                        didSomething = true;
                        location.gatewayFns.delete(key);
                        return
                    } 
                });
            }

            // check for direction
            if (!didSomething) {
            if (location.answers.at(-1)[0].some((verb) => strInput.startsWith(verb))) {
                if (location.answers.at(-1)[1].some((objirection) => strInput.endsWith(objirection))) {
                    // GATEWAYS
                    // console.log(location.requirements);
                    if ((!(location.requirements.some((req)=> strInput.endsWith(req)))) || pockets.some((item) => item['names'].some((itemName) => strInput.endsWith(itemName)))) {
    ///// if the item/direction isn't "locked" in the requirements arr AND/OR said item/direction is in the players pockets then...
                        // !!! CONTINUE TO NEXT ROOM !!!
                        playerInput.blur();
                        // Remove all added text
                        [...allText.children].forEach((el) => el.style.opacity = 0);
                        // if there is only one direction choice
                        if (location.directions.length === 1) {
                            let index = location.directions[0][0];
                            let num = location.directions[0][1];
                            currentLocation[index] += num 
                            // console.log(currentLocation)
                        } else { // direction must be a choice
                            const coords = directionMap.get(strInput.toLowerCase().split(" ").slice(-1)[0][0]);
                            // console.log(coords);
                            currentLocation[coords[0]] += coords[1];
                        }
                        // console.log(currentLocation);
                        setTimeout(function() {
                            // remove all added instructions
                            document.querySelectorAll('.added').forEach((el) => el.remove());
                            const newLocation = allGameTextMap.get(String(currentLocation));
                            setGameText();
                            newLocation.beenHere.push('✅');
                            let timesBeenHere = findProperty('beenHere').length;
                            console.log(timesBeenHere);
                            if (timesBeenHere === 1) {
                                addTransitionText(findProperty('transitionText'));
                                setTimeout(function() { // game (story) text appears last
                                    makeGameTextVisible();
                                }, 3000);
                            } else makeGameTextVisible(); // Need something to stop transition text showing up again here
                        }, 1500);
                    checked = false;
                } else addInstruction(`LOCKED BY REQUIREMENTS ARRAY`);
            } else addInstruction(`\n "${strInput.split(" ").slice(-1)}" is not a valid direction or object, please try again`);
        } else addInstruction(`"${input}" is not a valid instruction at this time, please type a verb followed by either a direction or an object`);
    }
        }
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

    const addTransitionText = function(text) {
        if (text !== '') {
            const newH2 = document.createElement('h2');
            newH2.classList.add('transition');
            newH2.classList.add('added');
            const addedText = document.createTextNode(text);
            newH2.appendChild(addedText);
            allText.insertAdjacentElement("afterbegin", newH2);
            const transitionText = document.querySelector('.transition');
            transitionText.style.display = 'block';
            setTimeout(function() {
                transitionText.style.opacity = 100;
            }, 1500);
        }
    }   

    const makeGameTextVisible = function() { // game (story) text appears last
        gameText.style.opacity = 100;
        inputForm.style.opacity = 100;
        playerInput.focus();
    };


    // Title grow/shrink effect
    const emphasizeTitle = function (e) {
        title.style.fontSize = '80px';
        title.style.letterSpacing = '6px'
    };

    const defaultTitle = function(e) {
        title.style.fontSize = '70px';
        title.style.letterSpacing = 'normal'
    };

// TODO: Change first two lines of this function to just insert individualised HTML code for each location. That way hints can be anywhere in the text. 
    const setGameText = function() {
        if (findProperty('html') != null) {
            gameText.innerHTML = findProperty('html');
        }
        // else {
        //     gameTextPlain.textContent = findProperty('plainText');
        //     hintElement.textContent = findProperty('hint');
        //     allText.style.opacity = 100;
        // }
    }

    // hide title screen & show game intro text
    const beginning = function() {
        startScreen.style.opacity = 0;
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
    
    // ONLY WORKS ON DESKTOP, THIS BREAKS THE PAGE ON MOBILE BROWSERS
    // startButton.addEventListener('mouseenter', emphasizeTitle);
    // startButton.addEventListener('mouseleave', defaultTitle);

    // Start game
    startButton.addEventListener('click', beginning);
    // startButton.addEventListener('touchstart', beginning);



    // User input
    let currentInput;
    document.addEventListener('keypress', (e) => {
        const keyName = e.key;
        // const code = e.code;
        if (keyName === "Enter") {
            e.preventDefault();
            currentInput = playerInput.value;
            // inputTester(currentInput, find('answers')[0], find('directions'));
            inputTester(currentInput, allGameTextMap.get(String(currentLocation)));
            playerInput.value = ""; // clear input field
            // console.log(allGameTextMap.get(String(currentLocation)));
        }
    })

    document.addEventListener('click', function() {
        playerInput.focus();
    });
}

if(document.readyState !== 'loading') {
    runOnStart();
}
else {
    document.addEventListener('DOMContentLoaded', function() {
        runOnStart();
    });
}
