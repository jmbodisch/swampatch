var width = 6;
var height = 12;
var numOfColors = 5;        // easy mode = 5; hard = 6
var well = [];
var previousRow = [];       // This is needed to ensure that adjacent generated blocks are not the same color
var cursorPos = 0;          // 2-wide cursor; the number corresponds to the block the left half of the cursor is on
var MINIMUM_FOR_MATCH = 3;
var MATCHED_STATE = 10;     // This value is added to blocks when they match
var statusDisplay = document.getElementById("p2");
var buttonUp = document.getElementById("button1");
var buttonDown = document.getElementById("button2");
var buttonLeft = document.getElementById("button3");
var buttonRight = document.getElementById("button4");
var buttonSwap = document.getElementById("button5");
var buttonReroll = document.getElementById("button6");
var timer = 0;

function initializeWell() {     //Well is empty and of size 0; "inflate" it with 0's (blank) to the right size
    for (var i = 0; i < (width * height); i++) {
        well.push(0);
    }
    for (i = 0; i < width; i++) {
        previousRow.push(0);
    }
}

function generateWell() {       //This will fill the well using generateRow() repeatedly
    for (var i = 0; i < height; i++) {
        generateRow();
        for (var j = 0; j < width; j++) {
            well[(i*width)+j] = previousRow[j];        
        }
    }
}

function generateWell2() {      // This gives a 10 combo; there was a bug but it is fixed now
    well = [3, 2, 3, 5, 1, 3, 2, 1, 4, 3, 4, 5, 1, 2, 3, 5, 3, 2, 4, 3, 5, 4, 2, 3, 1, 4, 3, 2, 3, 2, 2, 3, 5, 4, 1, 4, 1, 2, 4, 2, 4, 1, 3, 5, 2, 4, 3, 2, 5, 3, 1, 4, 3, 1, 2, 4, 4, 3, 4, 5, 3, 5, 3, 4, 3, 2, 1, 4, 2, 5, 4, 1];
}

function generateRow() {        //This will create a row of random blocks
    var newRow = [];
    for (var i = 0; i < width; i++) {
        do {
            do {newRow[i] = (Math.floor((Math.random() * numOfColors)) + 1);    //Colors start from 1
            } while (i > 0 && newRow[i] == newRow[i-1]);    // Pick a random color and repeat until it doesn't match the one left to it...
        } while (newRow[i] == previousRow[i]);              // ...This check can only be done if i>0
        //Repeat until it doesn't match the one directly above it
        previousRow[i] = newRow[i];     // Copy the new values to previousRow so generateWell can use them
    }
    
}

function moveCursorDown() {
    if (cursorPos - width < 0)                  // Cursor is at the bottom row
        return;
    else {
        cursorPos = cursorPos - width;
    }
}

function moveCursorUp() {
    if (cursorPos + width > width * height - 1) // Cursor is at the top row
        return;
    else {
        cursorPos = cursorPos + width;
    }
}

function moveCursorLeft() {
    if (cursorPos % width == 0)                 // Cursor is on the left wall
        return;
    else {
        cursorPos = cursorPos - 1;
    }
}

function moveCursorRight() {
    if ((cursorPos + 2) % width == 0)           // Cursor is on the right wall
        return;
    else {
        cursorPos = cursorPos + 1;
    }
}

function onKeyDown(e) {
    switch(e.keyCode) {
        case 37:            // left arrow
            moveCursorLeft();
            break;
        case 38:            // up arrow
            moveCursorUp();
            break;
        case 39:            // right arrow
            moveCursorRight();
            break;
        case 40:            // down arrow
            moveCursorDown();
            break;
        case 82:            // r
            generateWell();
            break;
        case 83:            // s
            swapBlocks();
            break;
    }
}

function swapBlocks() {
    var tempValue;
    tempValue = well[cursorPos];
    well[cursorPos] = well[cursorPos + 1];
    well[cursorPos + 1] = tempValue;
    checkBlockForMatch(cursorPos);
    checkBlockForMatch(cursorPos+1);
}

function checkBlockForMatch(blockPos) {
    var listOfMatchingVBlocks = [];                             // This is a list of blocks found to match the block being checked,
    var listOfMatchingHBlocks = [];                             // Separate lists for horizontal and vertical                             
    listOfMatchingVBlocks = checkForVerticalMatches(blockPos);  // They will be passed around between functions
    listOfMatchingHBlocks = checkForHorizontalMatches(blockPos);
    if (listOfMatchingVBlocks.length >= MINIMUM_FOR_MATCH)       // If we have 3 or more blocks matching...
        onMatch(listOfMatchingVBlocks);                          // ...let onMatch do its magic!
    if (listOfMatchingHBlocks.length >= MINIMUM_FOR_MATCH)
        onMatch(listOfMatchingHBlocks);
}

function checkForVerticalMatches(blockPos) {                    // Check for a vertical match anchored from the node block at blockPos
    var match = false;
    var checkPos = blockPos;
    var listOfMatchingBlocks = [blockPos];                      // The node block matches itself, so I put it in the list. It seems to make things easier
    do {                                                        // First check downward
        checkPos = checkPos - width;
        if (checkPos < 0)                                       // Nothing exists O/B and cannot match anything
            match = false;
        else {
            if (well[blockPos] == well[checkPos]) {
                match = true;
                listOfMatchingBlocks.push(checkPos);            // A matching block was found, add it to the list
            }
            else
                match = false;                                  // No matching block was found, we don't need to continue in this loop
        }
    } while (match);
    checkPos = blockPos;                                        // Go back to where we started
    do {                                                        // Now check upward
        checkPos = checkPos + width;
        if (checkPos >= width * height)                         // O/B
            match = false;
        else {
            if (well[blockPos] == well[checkPos]) {
                match = true;
                listOfMatchingBlocks.push(checkPos);
            }
            else
                match = false;
        }
    } while (match);
    return listOfMatchingBlocks;
}

function checkForHorizontalMatches(blockPos) {
    var match = false;
    var checkPos = blockPos;
    var listOfMatchingBlocks = [blockPos];
    do {
        if (checkPos % width == 0)
            match = false;
        else {
            checkPos = checkPos - 1;
            if (well[blockPos] == well[checkPos]) {
                match = true;
                listOfMatchingBlocks.push(checkPos);
            }
            else
                match = false;
        }
    } while (match);
    checkPos = blockPos;
    do {
        checkPos = checkPos + 1;
        if (checkPos % width == 0)
            match = false;
        else {
            if (well[blockPos] == well[checkPos]) {
                match = true;
                listOfMatchingBlocks.push(checkPos);
            }
            else
                match = false;
        }
    } while (match);
    return listOfMatchingBlocks;
}

function onMatch(listOfBlocks) {                                // Magical sparkle rainbow unicorn function that does handles the event of a match
    for (var i = 0; i < listOfBlocks.length; i++) {
        if (well[listOfBlocks[i]] < MATCHED_STATE)                         // Added this check so it would not "clear" the same block multiple times
            well[listOfBlocks[i]] += MATCHED_STATE;
    }
}

function listMatches(listOfBlocks) {                            // Prints the current list of matching blocks to the page;
    for (var i = 0; i < listOfBlocks.length; i++) {             // ...this might be useful later.
        statusDisplay.innerHTML += "<br>" + listOfBlocks[i];
    }
}

function initializePage() {
    window.addEventListener("keydown", onKeyDown, true);
    buttonUp.addEventListener("click", moveCursorUp);       // All of these can be removed
    buttonDown.addEventListener("click", moveCursorDown);   //
    buttonLeft.addEventListener("click", moveCursorLeft);   //
    buttonRight.addEventListener("click", moveCursorRight); //
    buttonSwap.addEventListener("click", swapBlocks);       //
    buttonReroll.addEventListener("click", generateWell);   //
    initializeGraphics();           // Currently this controls when the game will start--only after the graphics have loaded
}

function startGame() {
    initializeWell();
    generateWell2();
    setInterval(update, 16);
}

function update() {
    displayWell();
}

initializePage();
