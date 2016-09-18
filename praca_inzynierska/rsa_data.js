var messageText = '';
var keyPharseKeyText = '';
var keyText = '';
var encryptedMessageText = '';
var keyLenght;

var publicKey;
var publicKeyString;
//var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
//var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey); 

function setMessage()		//zapisywanie wiadomości
{
	messageText = document.getElementById('message').value;
}

function setKeyLenght()
{
	keyLenght = document.getElementById('Key_lenght').value;
	
}

function setKeyPharse()		//zapisywanie klucza
{
	keyPharseKeyText  = document.getElementById('Key_pharse').value;
	
}

function setKeyText() 		//wpisanie klucza do pola tekstowego
{
	publicKey = cryptico.generateRSAKey(messageText, keyLenght);
	publicKeyString = cryptico.publicKeyString(publicKey);
	document.getElementById('keyText').value = publicKeyString;
	
}