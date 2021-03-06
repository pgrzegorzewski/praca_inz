function toggle_visibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

var CAESAR_KEY = 13;
var CAESAR_KEY_2 = 3;
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

function setRotType()
{
	return document.getElementById('classic_cipher_list').value;
}


function setKey()
{
	var keyValue = document.getElementById('key');
	shift = Math.abs(keyValue.value);
	document.getElementById('key').value = shift;
	document.getElementById('key_letter').value = String.fromCharCode(shift+SMALL_A);
	shiftSet = 1;
	enable_input();
}

function setKeyLetter2()
{
	var keyLetter = document.getElementById('key_letter2');
	var keyLetterValue = keyLetter.value.charCodeAt();
	enable_input();
	shiftSet2 = 1;
	if(keyLetterValue >= SMALL_A && keyLetterValue <= SMALL_Z)
	{
		document.getElementById('key2').value = keyLetterValue - CAPITAL_A - 32;
		document.getElementById('key_letter2').value = document.getElementById('key_letter2').value.toUpperCase();
		shift2 = keyLetterValue - CAPITAL_A;
		
	}
	else if(keyLetterValue >= CAPITAL_A && keyLetterValue <= CAPITAL_Z)
	{	
		document.getElementById('key2').value = keyLetterValue - CAPITAL_A;
		shift2 = keyLetterValue - CAPITAL_A;
	}
	else
	{
		document.getElementById('key_letter2').value = "A";
		document.getElementById('key2').value = 0;
		shift2 = 0
	}
	
}

function setKeyLetter()
{
	var keyLetter = document.getElementById('key_letter2');
	var keyLetterValue = keyLetter.value.charCodeAt();
	enable_input2();
	shiftSet2 = 1;
	if(keyLetterValue < SMALL_A || keyLetterValue > SMALL_Z)
	{
		document.getElementById('key_letter2').value = "a";
		document.getElementById('key2').value = 0;
		shift2 = 0;
	}
	else
	{	
		document.getElementById('key2').value = keyLetterValue - SMALL_A;
		shift2 = keyLetterValue - SMALL_A;
	}
	
}

function setKey2()
{
	var keyValue2 = document.getElementById('key2');
	shift2 = Math.abs(keyValue2.value);
	document.getElementById('key2').value = shift2;
	if(shift2 < 0 || shift2 > 25)
	{
		shift2 = 0;
		document.getElementById('key2').value = 0;
	}
	document.getElementById('key_letter2').value = String.fromCharCode(shift2 + CAPITAL_A);
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
	else if(direction2 == "left"){
		after = parseInt(beforeASCII - parseInt(shift2));
		if(smallLetterFlag == 1 && after < SMALL_A){
			after = SMALL_Z - (SMALL_A - after - 1); 
		}
		if(capitalLetterFlag == 1 && after < CAPITAL_A)
		{
			after = CAPITAL_Z - (CAPITAL_A - after - 1);
		}
		else if(blankCharFlag == 1)
		{
			after = after + parseInt(shift2);
		}
	}
	blankCharFlag = 0;
	capitalLetterFlag = 0;
	smallLetterFlag = 0;
	return after;
}

function casearCharacterClassic(character, shift)
{
	var after;
	var beforeASCII = character.charCodeAt(0);
		
	if(beforeASCII >= CAPITAL_A && beforeASCII <= CAPITAL_Z)
		capitalLetterFlag = 1;
	else if(beforeASCII >= SMALL_A && beforeASCII <= SMALL_Z)
		smallLetterFlag = 1;
	else
		blankCharFlag = 1;
	
	after = parseInt(beforeASCII + parseInt(shift));
	if(smallLetterFlag == 1 && after > SMALL_Z){
		after = (after % SMALL_Z) + SMALL_A - 1; 
	}
	else if(capitalLetterFlag == 1 && after > CAPITAL_Z)
	{
		after = (after % CAPITAL_Z) + CAPITAL_A - 1;
	}
	else if(blankCharFlag == 1)
	{
		after = after - parseInt(shift);
	}

	blankCharFlag = 0;
	capitalLetterFlag = 0;
	smallLetterFlag = 0;
	return after;
}

function ceasarString()
{
	var newString = "";
	var letter;

	var check = document.getElementById('caesarString').value;
	for (var i = 0; i < check.length;  i++)
	{
		letter = String.fromCharCode(casearCharacter(check[i]));
		newString = newString.concat(letter);
	}
	document.getElementById("caesar_encrypted_3").value = newString;	
	
}


function classic_caesar()
{
	/*var after;
	var letter = document.getElementById('caesarClassic');
	var before = letter.value;
	var rotType = setRotType();
	before = before.charCodeAt(0);
	if(rotType == 'historical')
		after = parseInt(before + parseInt(CAESAR_KEY_2));
	else
		after = parseInt(before + parseInt(CAESAR_KEY))
	if((before < CAPITAL_A) || (before > SMALL_Z) || (before > CAPITAL_Z && before < SMALL_A))
	{
		document.getElementById("caesar_encrypted_2").value = String.fromCharCode(before);
	}
	else
	{	
		if((before >= SMALL_A && before <= SMALL_Z) && after > SMALL_Z){
			after = (after % SMALL_Z) + SMALL_A - 1; 
		}
		else if((before >= CAPITAL_A && before <= CAPITAL_Z) && after > CAPITAL_Z)
		{
			after = (after % CAPITAL_Z) + CAPITAL_A - 1;
		}
		document.getElementById("caesar_encrypted_2").value = String.fromCharCode(after);
	}*/
	var newString = "";
	var letter;
	var rotType = setRotType();
	var rotShift;
	if(rotType == 'historical')
		rotShift = CAESAR_KEY_2;
	else
		rotShift = CAESAR_KEY;
	
	alert(rotShift);
	var check = document.getElementById('caesarClassic').value;
	for (var i = 0; i < check.length;  i++)
	{
		letter = String.fromCharCode(casearCharacterClassic(check[i], rotShift));
		newString = newString.concat(letter);
	}
	document.getElementById("caesar_encrypted_2").value = newString;
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
