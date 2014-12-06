
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
<script src="jquery-1.11.1.min.js"></script>
</head>

<body>

<script type="text/javascript">

var scripts = {"Matrix": 'var numberOfColumns = 50;##var pixelsPerColumn = width / numberOfColumns;####var columnY = [];##for (var i=0; i<numberOfColumns; i++) {##  columnY[i] = randomInt(0, height);##}####var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";##c.font = "12px Courier";####function step() {##  c.fillStyle = "rgba(0,0,0,0.05)";##  c.fillRect(0, 0, width, height);##  c.fillStyle = "#0f0";##  for (var i=0; i<numberOfColumns; i++) {##    var r = randomInt(0, characters.length);##    var char = characters.substring(r, r+1);##    c.fillText(char, i*pixelsPerColumn, columnY[i]);##    columnY[i] += pixelsPerColumn;##    if (columnY[i] > height) {##      columnY[i] -= height;##    }##  }##}####loop(step, 100);;',
"Space": 'function resetStar(star) {##  star.x = width/2;##  star.y = height/2;##  var speed = randomFloat(.1, 5);##  var angle = randomFloat(0, 2*Math.PI);##  star.dx = speed * Math.cos(angle);##  star.dy = speed * Math.sin(angle);##  star.brightness = randomFloat(2, 5);##}####var stars = [];##for (var i=0; i<500; i++) {##  var star = {};##  resetStar(star);##  stars.push(star);##}####function step() {##  c.fillStyle = "#000";##  c.fillRect(0, 0, width, height);##  c.lineWidth = 2;##  for (var i=0; i<stars.length; i++) {##    var star = stars[i];##    c.beginPath();##    c.moveTo(star.x, star.y);##    star.x += star.dx;##    star.y += star.dy;##    star.brightness = Math.min(star.brightness*1.05, 255);##    c.lineTo(star.x, star.y);##    var b = Math.round(star.brightness);##    c.strokeStyle = "rgb(" + b + "," + b + "," + b + ")";##    c.stroke();##    c.closePath();##    star.dx *= 1.05;##    star.dy *= 1.05;##    if (star.x < 0 || star.x > width || star.y < 0 || star.y > height) {##      resetStar(star);##    }##  }##}####loop(step, 20);'};

function setScript() {
	var js = scripts[$('#script').val()].replace(/##/g,"\n");
	if (js) {
		$('#js').val(js);
	}
	/* $('#script').val("Scripts...").blur(); */
}

var loopId = null;

function loop(fn, interval) {
	loopId = setInterval(fn, interval);
	$('#stop').prop("disabled",false);
}

var vardefs = "var canvas = $('canvas')[0]; var c = canvas.getContext('2d'); var width = canvas.width; var height = canvas.height;"

function runScript() {
	var js = vardefs + "resetScript();" + $('#js').val();
	eval(js);
}

function stopScript() {
    if (loopId) {
	    clearInterval(loopId);
		$('#stop').prop("disabled",true);
	}
}

function resetScript() {
	stopScript();
	var canvas = $('canvas')[0];
	var c = canvas.getContext('2d');
	c.clearRect(0, 0, canvas.width, canvas.height);
}

function randomFloat(min, max) {
	return min + Math.random()*(max-min);
}

function randomInt(min, max) {
	return Math.floor(randomFloat(min, max));
}

</script>

<table>
<tr>
<td style="width:500px; vertical-align:top;">
<div>
<div style="float:left;">
<button onclick="runScript()">Run</button>
<button id="stop" onclick="stopScript()">Stop</button>
</div>
<div style="float:right;">
<select id="script" onchange="setScript()">
<option>Scripts...</option>
</select>
</div>
</div>
<div style="clear:both"></div>
<div>
Predefined variables and functions:<br/>
c: the graphics canvas context<br/>
width: the width of the canvas<br/>
height: the height of the canvas<br/>
randomInt(min,max): returns an integer between min and max (inclusive)<br/>
randomFloat(min,max): return a float between min and max (inclusive)
</div>
<textarea id="js" style="width:500px; height:470px;"></textarea>
</td>
<td style="width:520px; vertical-align:top;">
<canvas width="500" height="500" style="border: solid 1px #888;"></canvas>
</td>
</tr>
</table>

<script type="text/javascript">
for (var name in scripts) {
	$('#script').append('<option>' + name + '</option>');
}
$('#stop').prop("disabled",true);
</script>

</body>
</html>
