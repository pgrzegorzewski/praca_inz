function toggle_visibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

var CAESAR_KEY = 13;
var CAPITAL_A = 65;
var SMALL_A = 97
var CAPITAL_Z = 90;
var SMALL_Z = 122;

var shift;
var direction;

var shift2;
var direction2;

/* FLAGS */

var smallLetterFlag;
var capitalLetterFlag;
var blankCharFlag;

var shiftSet = 0;
var shiftSet2 = 0;
var directionSet = 0;
var directionSet2 = 0;

/* -----*/

function setShift()
{
	var readShift = document.getElementById('list');
	direction = readShift.value;
	directionSet = 1;
	enable_input();
}

function setShift2()
{
	var readShift2 = document.getElementById('list2');
	direction2 = readShift2.value;
	directionSet2 = 1;
	enable_input2()
}


function setKey()
{
	var keyValue = document.getElementById('key');
	shift = Math.abs(keyValue.value);
	//alert(shift);
	document.getElementById('key').value = shift;
	shiftSet = 1;
	enable_input();
}


function setKey2()
{
	var keyValue2 = document.getElementById('key2');
	shift2 = Math.abs(keyValue2.value);
	document.getElementById('key2').value = shift2;
	shiftSet2 = 1;
	enable_input2();
}

function caesar()
{
	var after;
	var beforeASCII;
	var letter = document.getElementById('caesar');
	var before = letter.value;
	beforeASCII = before.charCodeAt(0);
	if(beforeASCII >= CAPITAL_A && beforeASCII <= CAPITAL_Z)
		capitalLetterFlag = 1;
	if(beforeASCII >= SMALL_A && beforeASCII <= SMALL_Z)
		smallLetterFlag = 1;
	if((direction == "right" && smallLetterFlag == 1) || (direction == "right" && capitalLetterFlag == 1)){
		after = parseInt(beforeASCII + parseInt(shift));
		if(smallLetterFlag == 1 && after > SMALL_Z){
			after = (after % SMALL_Z) + SMALL_A - 1; 
		}
		if(capitalLetterFlag == 1 && after > CAPITAL_Z)
		{
			after = (after % CAPITAL_Z) + CAPITAL_A - 1;
		}
	}
	if((direction == "left" && smallLetterFlag == 1) || (direction == "left" && capitalLetterFlag == 1)){
		after = parseInt(beforeASCII - parseInt(shift));
		if(smallLetterFlag == 1 && after < SMALL_A){
			after = SMALL_Z - (SMALL_A - after - 1); 
		}
		if(capitalLetterFlag == 1 && after < CAPITAL_A)
		{
			after = CAPITAL_Z - (CAPITAL_A - after - 1);
		}
	}
	alert('letter ' + before + ' before encryption. Result of encryption: ' + after + ' with key ' + shift);
	document.getElementById('caesar_encrypted').value = String.fromCharCode(after);	
}

function caesarWhitCharIgnore(character)
{
	return character;
}

function casearCharacter(character)
{	
	var after;
	var beforeASCII = character.charCodeAt(0);
		
	if(beforeASCII >= CAPITAL_A && beforeASCII <= CAPITAL_Z)
		capitalLetterFlag = 1;
	else if(beforeASCII >= SMALL_A && beforeASCII <= SMALL_Z)
		smallLetterFlag = 1;
	else
		blankCharFlag = 1;
	if(direction2 == "right"){
		after = parseInt(beforeASCII + parseInt(shift2));
		if(smallLetterFlag == 1 && after > SMALL_Z){
			after = (after % SMALL_Z) + SMALL_A - 1; 
		}
		else if(capitalLetterFlag == 1 && after > CAPITAL_Z)
		{
			after = (after % CAPITAL_Z) + CAPITAL_A - 1;
		}
		else if(blankCharFlag == 1)
		{
			after = after - parseInt(shift2);
		}
	}
	else if((direction2 == "left" && smallLetterFlag == 1) || (direction2 == "left" && capitalLetterFlag == 1)){
		after = parseInt(beforeASCII - parseInt(shift2));
		if(smallLetterFlag == 1 && after < SMALL_A){
			after = SMALL_Z - (SMALL_A - after - 1); 
		}
		if(capitalLetterFlag == 1 && after < CAPITAL_A)
		{
			after = CAPITAL_Z - (CAPITAL_A - after - 1);
		}
	}
	return after;
}

function ceasarString()
{
	var newString = "";
	var letter;
	//alert('działa');
	//var preprocessedString = document.getElementById('caesarString');
	//var check = preprocessedString.valueOf();
	var check = document.getElementById('caesarString').value;
	for (var i = 0; i < check.length;  i++)
	{
		letter = String.fromCharCode(casearCharacter(check[i]));
		newString = newString.concat(letter);
	}
	document.getElementById('caesarString').value = newString;	
	
}


function classic_caesar()
{
	var after;
	var letter = document.getElementById('caesar_classic');
	var before = letter.value;
	after = before.charCodeAt(0);
	after = parseInt(after + parseInt(CAESAR_KEY));
	//alert('letter ' + before + ' before encryption. Result of encryption: ' + after + ' with key ' + CAESAR_KEY);
	document.getElementById('caesar_classic').value = String.fromCharCode(after);	
	
}

function enable_input()
{
	if(shiftSet == 1 && directionSet == 1)
		document.getElementById('caesar').disabled = false;
}

function enable_input2()
{
	
	if(shiftSet2 == 1 && directionSet2 == 1)
		document.getElementById('caesarString').disabled = false;
}
