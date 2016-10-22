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


function readKeyDecryption()
{

		isKeyDecryptionChanged = 1;
		keyDecryptionSet = 1;
		keyDecryption= document.getElementById('key_decryption').value;
		keyDecryptionLength = keyDecryption.length;
		setKeyDecryption();
}


function readEncryptedText()
{
	textEncryptedSet = 1;
	textEncrypted  = document.getElementById('encrypted_text').value;
	textEncryptedLength = textEncrypted.length;

}


function compareTextKeyLenght()
{
	keyTextEncryptedLenghtDifference = textEncryptedLength - keyDecryptionLength;
}

function setKeyDecryption()
{
	compareTextKeyLenght();
	newKeyDecryption = "";
	var letter;
		for (var i = 0; i < (keyDecryptionLength + keyTextEncryptedLenghtDifference);  i++)
		{
			letter = keyDecryption[i % keyDecryptionLength];
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
	{
		divShow(name);
		if(name == 'encryption_part')
		{
			isEncryptionHidden = 0;
			clearEncryptionTextBoxes();
		}
		if(name == 'decryption_part')
		{
			isDecryptionHidden = 0;
			clearDecryptionTextBoxes();
		}
	}	
	else
	{
		divHide(name);
		if(name == 'encryption_part')
			isEncryptionHidden = 1;
		if(name == 'decryption_part')
			isDecryptionHidden = 1;
	}	
	resetFlagsAndValues()
}


function clearDecryptionTextBoxes()
{
	clearTextarea('key_decryption');
	clearTextarea('encrypted_text');
	clearTextarea('reversed_key');
	clearTextarea('vigenere_decrypted');
}
