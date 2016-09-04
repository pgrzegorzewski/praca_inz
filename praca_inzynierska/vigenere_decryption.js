var CAESAR_KEY = 13;
var CAPITAL_A = 65;
var SMALL_A = 97
var CAPITAL_Z = 90;
var SMALL_Z = 122;

var ENGLISH_ALPHABET_LENGTH = 26;

var keyDecryption = "";
var newKeyDecryption ="";
var textEncrypted = "";
var keyDecryptionSet = 0;
var textEncryptedSet = 0;

var keyDecryptionLength = 0;
var textEncryptedLength = 0;
var keyTextEncryptedLenghtDifference = 0;
var newDecryptionKey = "";

var reversedKey = "";
/*
var key2Set = 0;
var text2Set = 0;


var textMessage;

//var keyLength = 0;
var textMessage2Length = 0;
var keyMessage2LenghtDifference = 0;
var key2;
var newKey2 = "";
var textMessage2;

*/
/* FLAGS */
//var SHORTER_PASSWORD;


function readKeyDecryption()
{
	keDecryptionySet = 1;
	keyDecryption= document.getElementById('key_decryption').value;
	keyDecryptionLength = keyDecryption.length;
	//alert(keyDecryption + '' + keyDecryptionLength);
	
	setKeyDecryption();
}
/*
function readKey2()
{
	key2Set = 1;
	key2 = document.getElementById('key2').value;
}
*/

function readEncryptedText()
{
	textEncryptedSet = 1;
	textEncrypted  = document.getElementById('encrypted_text').value;
	textEncryptedLength = textEncrypted.length;
	//compareTextKey();
	//alert(textEncrypted + '' + textEncryptedLength);
}


function compareTextKeyLenght()
{
	keyTextEncryptedLenghtDifference = textEncryptedLength - keyDecryptionLength;
}

function setKeyDecryption()
{
	compareTextKeyLenght();
	//alert('test');
	newKeyDecryption = "";
	var letter;
		for (var i = 0; i < (keyDecryptionLength + keyTextEncryptedLenghtDifference);  i++)
		{
			letter = keyDecryption[i % keyDecryptionLength];
			//alert(letter);
			newKeyDecryption = newKeyDecryption.concat(letter);
		}
		reverseKey();
	//alert(newKeyDecryption);
}

function reverseKey()
{
	reversedKey="";
	var letter;
	for( i = 0; i < newKeyDecryptionLength; i++)
	{
		if(isSmallLetter(newKeyDecryption[i]))
		{
			letter = String.fromCharCode(((ENGLISH_ALPHABET_LENGTH - (newKeyDecryption - SMALL_A)%ENGLISH_ALPHABET_LENGTH)+SMALL_A);
		}
		else if(isCapitalLetter(newKeyDecryption[i]))
		{
			letter = String.fromCharCode(((ENGLISH_ALPHABET_LENGTH - (newKeyDecryption - CAPITAL_A)%ENGLISH_ALPHABET_LENGTH)+CAPITAL_A);
		}
		else
		{
			letter = String.fromCharCode(newKeyDecryption[i])
		}
		reversedKey = reversedKey.concat(letter);
	}
}
function vigenereDecrypt()
{
	//compareTextKey();
	alert('tets');
	var decryptedMessage = "";
	var letter;
	for (var i = 0; i < (keyDecryptionLength + keyTextEncryptedLenghtDifference); i++)
	{
		if(isSmallLetter(keyDecryption[i % keyDecryptionLength]) && isSmallLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + keyDecryption[i % keyDecryptionLength].charCodeAt(0) - 2* SMALL_A)%26)+SMALL_A);
		else if(isCapitalLetter(keyDecryption[i % keyDecryptionLength]) && isSmallLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + keyDecryption[i % keyDecryptionLength].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+SMALL_A);
		else if (isSmallLetter(keyDecryption[i % keyDecryptionLength]) && isCapitalLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + keyDecryption[i % keyDecryptionLength].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+CAPITAL_A);
		else if(isCapitalLetter(keyDecryption[i % keyDecryptionLength]) && isCapitalLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + keyDecryption[i % keyDecryptionLength].charCodeAt(0) - 2*CAPITAL_A)%26)+CAPITAL_A);
		else
			letter = String.fromCharCode(textEncrypted[i].charCodeAt(0));
		alert(letter);
		decryptedMessage = decryptedMessage.concat(letter);
	}
	document.getElementById('vigenere_decrypted').value = decryptedMessage;
	
}
/*
function isSmallLetter(letter)
{
	if(letter.charCodeAt(0) >= SMALL_A && letter.charCodeAt(0) <= SMALL_Z)
		return true;
}

function isCapitalLetter(letter)
{
		if(letter.charCodeAt(0) >= CAPITAL_A && letter.charCodeAt(0) <= CAPITAL_Z)
		return true;
}*/
/*
function readText2()
{
	text2Set = 1;
	textMessage2  = document.getElementById('vigenere_autokey').value;
	textMessage2Length = textMessage2.length;
	compareTextKey2();
}

function compareTextKey()
{
	keyMessageLenghtDifference = textMessageLength - keyLength;
	//alert('róznica' + keyMessageLenghtDifference);
}

function compareTextKey2()
{
	keyMessage2LenghtDifference = textMessage2Length - 1;
	//alert('róznica' + keyMessageLenghtDifference);
}

function setKey()
{
	compareTextKey();
	//alert('test');
	newKey = ''
	var letter;
		for (var i = 0; i < (keyLength + keyMessageLenghtDifference);  i++)
		{
			letter = key[i % keyLength];
			alert(letter);
			newKey = newKey.concat(letter);
		}
	document.getElementById("keyResult").value = newKey;	
	
}

function setKey2()
{
	newKey2 = '';
	var letter;
		for (var i = 0; i < (1 + keyMessage2LenghtDifference);  i++)
		{
			if(i == 0)
				letter = key2;
			else
				letter = textMessage2[i - 1];
			alert(letter);
			newKey2 = newKey2.concat(letter);
		}
	document.getElementById("keyResult2").value = newKey2;	
	
}

function vigenereWithAutokey()
{
	alert('tets');
	var encryptedMessage = "";
	var letter;
	for (var i = 0; i < (textMessage2Length); i++)
	{
		if(isSmallLetter(newKey2[i]) && isSmallLetter(textMessage2[i]))
			letter = String.fromCharCode(((textMessage2[i].charCodeAt(0) + newKey2[i].charCodeAt(0) - 2* SMALL_A)%26)+SMALL_A);
		else if(isCapitalLetter(newKey2[i]) && isSmallLetter(textMessage2[i]))
			letter = String.fromCharCode(((textMessage2[i].charCodeAt(0) + newKey2[i].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+SMALL_A);
		else if (isSmallLetter(newKey2[i]) && isCapitalLetter(textMessage2[i]))
			letter = String.fromCharCode(((textMessage2[i].charCodeAt(0) + newKey2[i].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+CAPITAL_A);
		else if(isCapitalLetter(newKey2[i]) && isCapitalLetter(textMessage2[i]))
			letter = String.fromCharCode(((textMessage2[i].charCodeAt(0) + newKey2[i].charCodeAt(0) - 2*CAPITAL_A)%26)+CAPITAL_A);
		else
			letter = String.fromCharCode(textMessage2[i].charCodeAt(0));
		alert(letter);
		encryptedMessage = encryptedMessage.concat(letter);
	}
	document.getElementById('vigenere_with_autokey_encrypted').value = encryptedMessage;
	
	
}


function vigenere()
{
	//compareTextKey();
	alert('tets');
	var encryptedMessage = "";
	var letter;
	for (var i = 0; i < (keyLength + keyMessageLenghtDifference); i++)
	{
		if(isSmallLetter(key[i % keyLength]) && isSmallLetter(textMessage[i]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - 2* SMALL_A)%26)+SMALL_A);
		else if(isCapitalLetter(key[i % keyLength]) && isSmallLetter(textMessage[i]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+SMALL_A);
		else if (isSmallLetter(key[i % keyLength]) && isCapitalLetter(textMessage[i]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+CAPITAL_A);
		else if(isCapitalLetter(key[i % keyLength]) && isCapitalLetter(textMessage[i]))
			letter = String.fromCharCode(((textMessage[i].charCodeAt(0) + key[i % keyLength].charCodeAt(0) - 2*CAPITAL_A)%26)+CAPITAL_A);
		else
			letter = String.fromCharCode(textMessage[i].charCodeAt(0));
		alert(letter);
		encryptedMessage = encryptedMessage.concat(letter);
	}
	document.getElementById('vigenere_encrypted').value = encryptedMessage;
	if(keyLength < textMessageLength / 2){	
		textHide('nothing_encrypted');
		textShow('encryption_more_than_half');
		keySpacePrint();
		textShow('key_space');
	}
	else{
		textHide('nothing_encrypted');
		textShow('encryption_less_than_half');
		keySpacePrint();
		textShow('key_space');
	}
	
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

function keySpacePrint()
{
	alert(keyLength);
	var keySpace;
	keySpace = Math.pow(26, keyLength);
	alert(keySpace);
	document.getElementById('key_space').innerHTML = "Key space for the given key is equal: " + keySpace;
	
}

function toggleVisibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

function textShow(name) {
    $('#' + name).show(300)
};

function divShow(name) {
    $('#' + name).show(300)
};

function textHide(name) {
    $('#' + name).hide(300)
};
*/