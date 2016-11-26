function toggle_visibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

var messageText = '';
var keyPhraseKeyText = '';
var keyText = '';
var encryptedMessageText = '';
var encryptedMessageText2 = '';
var decryptedMessageText = '';
var keyLenght = 512;

var publicKey;
var publicKeyString;


// Flags 
var keyPhraseSet = 0;
var messageSet = 0;
var encryptedMessageSet = 0;
var keySet = 0;
var keyLenghtSet = 0;

var isMessageChanged = 0;
var isKeyPhraseChanged = 0;
var isKeyLenghtChanged = 0;
var isEncryptedMessageChanged = 0;

//signature key
var messageSet2 = 0;
var publicKey2;
var keyLenght2 = 512;

var keyPhraseSet2 = 0;
var keySet2 = 0;
var keyLenghtSet2 = 0;
var isKeyLenghtChanged = 0;
var publicKeyId = '';
var isPublicId = 0;
var isSignedEncrypted = 0;



function clearTextarea(name)
{
	 document.getElementById(name).value = '';
}

function enableGenerateKeyButton()
{
	if(keyPhraseSet == 1)
	{
		document.getElementById('generateKeyButton').disabled = false;
	}
}

function enableEncryptButton()
{
	if(keySet == 1 &&  messageSet == 1)
	{
		document.getElementById('encrypt_button').disabled = false;
	}
}

function setMessage()
{
	if(messageSet == 1)
	{
		isMessageChanged = 1;
		//messageText = document.getElementById('message').value;
		clearTextarea('encryptedText');
	}
	messageText = document.getElementById('message').value;
	messageSet = 1;
	enableEncryptButton();
}

function setKeyLenght()
{
	if(keyLenghtSet == 1)
	{
		keyLenght = document.getElementById('Key_lenght').value;
		isKeyLenghtChanged = 1;
		clearKeyTextAreas();
	}
	
	if(document.getElementById('Key_lenght').value)
	{
		keyLenght = document.getElementById('Key_lenght').value;
	}
	else
	{
			keyLenght = 512;
	}
	keyLenghtSet = 1;
	enableGenerateKeyButton();
}

function clearKeyTextAreas()
{
	clearTextarea('encryptedText');
	clearTextarea('keyText');
	clearTextarea('public_key_e');
	clearTextarea('public_key_n_2');
	clearTextarea('public_key_n');
	clearTextarea('private_key_d');
	clearTextarea('messageDecrypted');
	//hideSafety();
}

function setKeyPharse()		//zapisywanie klucza
{
	if(keyPhraseSet = 1)
	{
		//keyPhraseKeyText  = document.getElementById('Key_pharse').value;
		isKeyPhraseChanged = 1;
		clearKeyTextAreas();
	}
	keyPhraseKeyText  = document.getElementById('Key_pharse').value;
	keyPhraseSet = 1;
	enableGenerateKeyButton();
}

function setKeyText() 		//wpisanie klucza do pola tekstowego
{
	if(keyPhraseSet == 1)
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
	document.getElementById('public_key_n').value = keyNSplitString();
	document.getElementById('private_key_d').value = keyDSplitString();
	document.getElementById('public_key_n_2').value = keyNSplitString();
	document.getElementById('public_key_e').value = 65537;
	enableEncryptButton();
}

function encrypt()
{
	if(messageSet == 1 && keySet == 1 && isPublicId == 0)
	{
		encryptedMessageText = cryptico.encrypt(messageText, publicKeyString);
		document.getElementById('encryptedText').value = encryptedMessageText.cipher;
	}
	else if(messageSet == 1 && keySet == 1 && isPublicId == 1)
	{
		encryptedMessageText = cryptico.encrypt(messageText, publicKeyString, publicKeyId);
		document.getElementById('encryptedText').value = encryptedMessageText.cipher;
		isSignedEncrypted = 1;
	}
	else if(messageSet == 0 && keySet == 1)
	{
		alert("please write the message You would like to encrypt");
	}
	else if(messageSet == 1 && keySet == 0)
	{
		alert("please generate key");
	}
	else
	{
		alert("please generate key and write the message You would like to encrypt");
	}
	
	isPublicId == 1
	
	//hideSafety();
	//showSafety();
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
	if(encryptedMessageSet == 1)
	{
		isEncryptedMessageChanged = 1;
		clearTextarea('messageDecrypted');
	}
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
	else
	{
		alert('put message to decrytp');
	}
	if(isSignedEncrypted == 1)
	{
		document.getElementById('signature').value = decryptedMessageText.publicKeyString; 
		document.getElementById('signatureStatus').value = 'Signature verified'; 
	}
	else
	{
		document.getElementById('signature').value = decryptedMessageText.publicKeyString; 
		document.getElementById('signatureStatus').value = 'Signature invalid'; 
	}
	
}

function textShow(name) {
    $('#' + name).show(300)
};

function textHide(name) {
    $('#' + name).hide(300)
};
/*
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

function hideSafety()
{
	textHide('nothing_encrypted');
	textHide('512');
	textHide('1024');
	textHide('2048');
	textHide('4096');
	
}*/

//signature key

function setMessage2()
{
	if(messageSet2 == 1)
	{
		isMessageChanged2 = 1;
		//messageText = document.getElementById('message').value;
		clearTextarea('encryptedText');
	}
	messageText2 = document.getElementById('message2').value;
	messageSet2 = 1;
	enableEncryptButton2();
}

function enableEncryptButton2()
{
	if(keyLenghtSet2 == 1 &&  messageSet2 == 1)
	{
		document.getElementById('encrypt_button2').disabled = false;
	}
}

function setKeyLenght2()						
{
	if(keyLenghtSet2 == 1)
	{
		keyLenght2 = document.getElementById('Key_lenght2').value;
		isKeyLenghtChanged2 = 1;
		clearKeyTextAreas();
	}
	
	if(document.getElementById('Key_lenght2').value)
	{
		keyLenght2 = document.getElementById('Key_lenght2').value;
	}
	else
	{
			keyLenght2 = 512;
	}
	keyLenghtSet2 = 1;
	enableEncryptButton2();
}


function setPublicSignature()
{
	publicKeyId = cryptico.generateRSAKey(messageText2, keyLenght2);
	//cryptico.publicKeyID(cryptico.publicKeyString(publicKeyId));
	document.getElementById('public_id').value = cryptico.publicKeyID(cryptico.publicKeyString(publicKeyId));;
	isPublicId = 1;
}