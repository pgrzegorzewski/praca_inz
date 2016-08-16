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

var keySet = 0;
var textSet = 0;
var directionSet = 0;
var directionSet2 = 0;

var keyLength = 0;
var textMessageLength = 0;
var keyMessageLenghtDifference = 0;
var key;
var newKey = "";
var textMessage;
/* -----*/

function readKey()
{
	keySet = 1;
	key = document.getElementById('key').value;
	keyLength = key.length;
}

function readText()
{
	textSet = 1;
	textMessage  = document.getElementById('vigenere').value;
	textMessageLength = textMessage.length;
	compareTextKey();
}

function compareTextKey()
{
	keyMessageLenghtDifference = textMessageLength - keyLength;
	//alert('róznica' + keyMessageLenghtDifference);
}

function setKey()
{
	//alert('test');
	var letter;
		for (var i = 0; i < (keyLength + keyMessageLenghtDifference);  i++)
		{
			letter = key[i % keyLength];
			alert(letter);
			newKey = newKey.concat(letter);
		}
	document.getElementById("keyResult").value = newKey;	
	
}

function vigenere()
{
	alert('tets');
	var encryptedMessage = "";
	var letter;
	for (var i = 0; i < (keyLength + keyMessageLenghtDifference); i++)
	{
		if(isSmallLetter(key[i % keyLength]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - 2* SMALL_A)%26)+SMALL_A);
		else if(isCapitalLetter(key[i % keyLength]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+CAPITAL_A);
		
		alert(letter);
		encryptedMessage = encryptedMessage.concat(letter);
	}
	document.getElementById('vigenere_encrypted').value = encryptedMessage;
	
	
}

function isSmallLetter(letter)
{
	if(letter.charCodeAt(0) >= SMALL_A && letter.charCodeAt(0) <= SMALL_Z)
		return true;
}

function isCapitalLetter(letter)
{
		if(letter.charCodeAt(0) >= CAPITAL_A && letter.charCodeAt(0) <= CAPITAL_Z)
		return true;
}

if(textSet == 1 && keySet == 1)
{
	compareTextKey();
	//setKeyResult();
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
	var after;
	var letter = document.getElementById('caesarClassic');
	var before = letter.value;
	after = before.charCodeAt(0);
	after = parseInt(after + parseInt(CAESAR_KEY));
	//alert('letter ' + before + ' before encryption. Result of encryption: ' + after + ' with key ' + CAESAR_KEY);
	document.getElementById("caesar_encrypted_2").value = String.fromCharCode(after);	
	
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
