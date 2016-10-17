var messageText = '';
var keyPharseKeyText = '';
var keyText = '';
var encryptedMessageText = '';
var encryptedMessageText2 = '';
var decryptedMessageText = '';
var keyLenght = 512;

var publicKey;
var publicKeyString;


// Flags 
var keyPharseSet = 0;
var messageSet = 0;
var encryptedMessageSet = 0;
var keySet = 0;


function setMessage()		//zapisywanie wiadomości
{
	messageText = document.getElementById('message').value;
	messageSet = 1;
}

function setKeyLenght()
{
	if(document.getElementById('Key_lenght').value)
	{
		keyLenght = document.getElementById('Key_lenght').value;
	}
	else
	{
			keyLenght = 512;
	}
}

function setKeyPharse()		//zapisywanie klucza
{
	keyPharseKeyText  = document.getElementById('Key_pharse').value;
	keyPharseSet = 1;
}

function setKeyText() 		//wpisanie klucza do pola tekstowego
{
	if(keyPharseSet == 1)
	{	
		publicKey = cryptico.generateRSAKey(messageText, keyLenght);
		publicKeyString = cryptico.publicKeyString(publicKey);
		document.getElementById('keyText').value = publicKeyString;
		keySet = 1;		
	}
	else
	{
		alert("Please put in you key pharse");
	}
}

function encrypt()
{
	if(messageSet == 1 && keySet == 1)
	{
		encryptedMessageText = cryptico.encrypt(messageText, publicKeyString);
		document.getElementById('encryptedText').value = encryptedMessageText.cipher;
	}
	else if(messageSet == 0 && keySet == 1)
	{
		alert("please write the message You would like to encrypt");
	}
	else if(messageSet == 1 && keySet == 0)
	{
		alert("plaese generate key");
	}
	else
	{
		alert("please generate key and write the message You would like to encrypt");
	}
	showSafety();
	document.getElementById('public_key_n').value = keyNSplitString();
	document.getElementById('private_key_d').value = keyDSplitString();
	document.getElementById('public_key_e').value = 65537;
}

function keyNSplitString()
{
	var keyN = '';
	for(var i = 0; i < ((Object.keys(publicKey.n).length) - 2); i++)
	{
		keyN += publicKey.n[i] + " ";
	}
	return keyN;
}

function keyDSplitString()
{
	var keyN = '';
	for(var i = 0; i < (Object.keys(publicKey.d).length); i++)
	{
		keyN += publicKey.n[i] + " ";
	}
	return keyN;
}

function setMessageEncrypted()
{
	encryptedMessageText2 = document.getElementById('messageEncrypted');
	encryptedMessageSet = 1;
	
}

function decrypt()
{
	if(encryptedMessageSet == 1 && keySet == 1)
	{
		decryptedMessageText = cryptico.decrypt(encryptedMessageText.cipher, publicKey)
		document.getElementById('messageDecrypted').value = decryptedMessageText.plaintext; 
	}
}

function textShow(name) {
    $('#' + name).show(300)
};

function textHide(name) {
    $('#' + name).hide(300)
};

function showSafety()
{
	textHide('nothing_encrypted');
	if(keyLenght == 512)
		textShow('512');
	else if(keyLenght == 1024)
		textShow('1024');
	else if(keyLenght == 2048)
		textShow('2048');
	else if (keyLenght == 4096)
		textShow('4096');
}