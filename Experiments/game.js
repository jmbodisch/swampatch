var width = 6;
var height = 12;
var numOfColors = 5;        // easy mode = 5; hard = 6
var well = [];
var previousRow = [];       // This is needed to ensure that adjacent generated blocks are not the same color
var cursorPos = 0;          // 2-wide cursor; the number corresponds to the block the left half of the cursor is on
var wellDisplay = document.getElementById("p1");
var buttonUp = document.getElementById("button1");
var buttonDown = document.getElementById("button2");
var buttonLeft = document.getElementById("button3");
var buttonRight = document.getElementById("button4");
var buttonSwap = document.getElementById("button5");
var buttonReroll = document.getElementById("button6");

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
    displayWell();
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

function displayWell() {
    wellDisplay.innerHTML = "";
    var currentPos;        
    for (var i = height - 1; i >= 0; i--) {
        for (var j = 0; j < width; j++) {
            currentPos = (i*width+j);
            if (currentPos == cursorPos || currentPos == cursorPos+1)
                wellDisplay.innerHTML += "<span style=\"color:white ; background-color:black\">" + well[currentPos] + "</span>" + " ";
            else
                wellDisplay.innerHTML += well[currentPos] + " ";
        }
        wellDisplay.innerHTML += "<br>";
    }
}

function moveCursorDown() {
    if (cursorPos - width < 0)                  // Cursor is at the bottom row
        return;
    else {
        cursorPos = cursorPos - width;
        displayWell();
    }
}

function moveCursorUp() {
    if (cursorPos + width > width * height - 1) // Cursor is at the top row
        return;
    else {
        cursorPos = cursorPos + width;
        displayWell();
    }
}

function moveCursorLeft() {
    if (cursorPos % width == 0)                 // Cursor is on the left wall
        return;
    else {
        cursorPos = cursorPos - 1;
        displayWell();
    }
}

function moveCursorRight() {
    if ((cursorPos + 2) % width == 0)           // Cursor is on the right wall
        return;
    else {
        cursorPos = cursorPos + 1;
        displayWell();
    }
}

function swapBlocks() {
    var tempValue;
    tempValue = well[cursorPos];
    well[cursorPos] = well[cursorPos + 1];
    well[cursorPos + 1] = tempValue;
    displayWell();
}

function initializePage() {
    buttonUp.addEventListener("click", moveCursorUp);
    buttonDown.addEventListener("click", moveCursorDown);
    buttonLeft.addEventListener("click", moveCursorLeft);
    buttonRight.addEventListener("click", moveCursorRight);
    buttonSwap.addEventListener("click", swapBlocks);
    buttonReroll.addEventListener("click", generateWell);
    initializeWell();
    generateWell();
}

initializePage();
