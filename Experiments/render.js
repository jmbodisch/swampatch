var GREEN_BLOCK = 1;
var LIGHTBLUE_BLOCK = 2;
var YELLOW_BLOCK = 3;
var PURPLE_BLOCK = 4;
var RED_BLOCK = 5;
var DARKBLUE_BLOCK = 6;
var CURSOR = 100;
var BLOCK_SIZE = 16;        // assumed to be square
var CURSOR_SIZE = 18;       // also assumed to be square
var sprites = new Image();
var wellDisplay = document.getElementById("canvas1");
var wellDraw = wellDisplay.getContext("2d");

function displayWell() {
    displayBlocks();
    //displayCursor();
    timer++;
    statusDisplay.innerHTML = timer;
}

function initializeGraphics() {
    sprites.onload = function () {
        startGame();
    }
    sprites.src = "Data/graphics/swampatch_graphics.png";
}

function displayBlocks() {
    var currentPos;
    var x;
    var y;
    var block;
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
        currentPos = (i*width+j);
            x = currentPos % width;
            y = Math.floor(currentPos / width);
            block = well[currentPos];
            if (GREEN_BLOCK <= well[currentPos] <= DARKBLUE_BLOCK) {
                wellDraw.drawImage(sprites, getSpriteLocation(block)[0], getSpriteLocation(block)[1],
                BLOCK_SIZE, BLOCK_SIZE,
                8 + (x * BLOCK_SIZE), 8 + ((height - 1 - y) * BLOCK_SIZE),
                BLOCK_SIZE, BLOCK_SIZE);        // @_@
            }
        }
    }
}

function getSpriteLocation(sprite) {                // Location of the requested sprite from the graphics .png file
    var x;
    var y;
    if (GREEN_BLOCK <= sprite <= DARKBLUE_BLOCK) {
        x = (sprite - 1) * BLOCK_SIZE;
        y = 0;
    }
    else if (sprite == CURSOR) {
        x = 0;
        y = BLOCK_SIZE;
    }
    return [x, y];
}
