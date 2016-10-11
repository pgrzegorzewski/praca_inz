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
var newKeyDecryptionLength = 0;

var textEncryptedLength = 0;
var keyTextEncryptedLenghtDifference = 0;



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
	newKeyDecryptionLength = newKeyDecryption.length;
	alert(newKeyDecryption);
	reverseKey();

}

function reverseKey()
{
	reversedKey="";
	var letter;
	for( i = 0; i < newKeyDecryptionLength; i++)
	{
		if(isSmallLetter(newKeyDecryption[i]))
		{
			letter = String.fromCharCode(((ENGLISH_ALPHABET_LENGTH - (newKeyDecryption[i].charCodeAt(0) - SMALL_A))%ENGLISH_ALPHABET_LENGTH)+SMALL_A);
			alert(letter);
		}
		else if(isCapitalLetter(newKeyDecryption[i]))
		{
			letter = String.fromCharCode(((ENGLISH_ALPHABET_LENGTH - (newKeyDecryption[i].charCodeAt(0) - CAPITAL_A))%ENGLISH_ALPHABET_LENGTH)+CAPITAL_A);
		}
		else
		{
			letter = String.fromCharCode(newKeyDecryption[i].charCodeAt(0))
		}
		reversedKey = reversedKey.concat(letter);
	}
	alert(reversedKey + "reversed");
	document.getElementById('reversed_key').value = reversedKey;
}
function vigenereDecrypt()
{
	//compareTextKey();
	alert('tets');
	var decryptedMessage = "";
	var letter;
	for (var i = 0; i < (newKeyDecryptionLength); i++)
	{
		if(isSmallLetter(reversedKey[i]) && isSmallLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + reversedKey[i].charCodeAt(0) - 2* SMALL_A)%26)+SMALL_A);
		else if(isCapitalLetter(reversedKey[i]) && isSmallLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + reversedKey[i].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+SMALL_A);
		else if (isSmallLetter(reversedKey[i]) && isCapitalLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + reversedKey[i].charCodeAt(0) - SMALL_A - CAPITAL_A)%26)+CAPITAL_A);
		else if(isCapitalLetter(reversedKey[i]) && isCapitalLetter(textEncrypted[i]))
			letter = String.fromCharCode(((textEncrypted[i].charCodeAt(0) + reversedKey[i].charCodeAt(0) - 2*CAPITAL_A)%26)+CAPITAL_A);
		else
			letter = String.fromCharCode(textEncrypted[i].charCodeAt(0));
		alert(letter);
		decryptedMessage = decryptedMessage.concat(letter);
	}
	document.getElementById('vigenere_decrypted').value = decryptedMessage;
	
}

function divShow(name) {
    $('#' + name).show(300)
};

function divHide(name) {
	$('#' + name).hide(300);
}

function isHidden(name){
	if($('#' + name).css('display') == 'none')
		return true;
}

function showHidePracticalPart(name)
{
	if(isHidden(name))	
		divShow(name);
	else
		divHide(name);
}
