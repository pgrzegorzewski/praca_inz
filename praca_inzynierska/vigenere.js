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

var keySet = 0;
var textSet = 0;

var key2Set = 0;
var text2Set = 0;

var keyLength = 0;
var textMessageLength = 0;
var keyMessageLenghtDifference = 0;
var key;
var newKey = "";
var keyLenght = 0;
var textMessage;

//var keyLength = 0;
var textMessage2Length = 0;
var keyMessage2LenghtDifference = 0;
var key2;
var newKey2 = "";
var textMessage2;


/* FLAGS */
var SHORTER_PASSWORD;

function readKey()
{
	keySet = 1;
	key = document.getElementById('key').value;
	keyLength = key.length;
}

function readKey2()
{
	key2Set = 1;
	key2 = document.getElementById('key2').value;
}

function readText()
{
	textSet = 1;
	textMessage  = document.getElementById('vigenere').value;
	textMessageLength = textMessage.length;
	//compareTextKey();
}


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
	else
		return false;
}

function isCapitalLetter(letter)
{
		if(letter.charCodeAt(0) >= CAPITAL_A && letter.charCodeAt(0) <= CAPITAL_Z)
			return true;
		else
			return false;
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


function textHide(name) {
    $('#' + name).hide(300)
};


function generateTable()
{
    document.write("<table class ='test' id = 'test'>");
    document.write("<th>" + " " + "</th>");
    for(var i = 0; i < 26; i++)
    {
        document.write("<th>" + "<button id ='letter' onclick='getId(this)'>"  + String.fromCharCode(i + CAPITAL_A) + "</button></th>");
    }
    for(var i = 0; i < 26; i++)
    {
        document.write("<tr>");
        document.write("<th>" + " <button id ='letter' onclick='getId(this)'>" + String.fromCharCode(i + CAPITAL_A) + "</button></th>");
        for(var j = 0; j < 26; j++)
        {    
            document.write("<td >" +" <button id ='letter'>" + String.fromCharCode(((j + i)%26)+65) + "</button></td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
};

var Y =0;
var X =0;
var el1 = 0;
var el2 = 0;

function  getId(element) {
    var table = document.getElementById('test');
    table.style.background = "white";
    alert("row" + element.parentNode.parentNode.rowIndex + 
    " - column" + element.parentNode.cellIndex);
    x = element.parentNode.parentNode.rowIndex;
    y = element.parentNode.cellIndex;
    if(X == 1 && Y == 1)
    {
        el2.style.background = "white";
        el1.style.background = "white";
        eraseColor();
        X =0;
        Y =0;
    }
    if (y != 0 && Y != 1)
    {
        el1 = element;
        changeColor(y);
        Y = 1;
    }
    else if (x != 0 && X != 1)
    {
        el2 = element;
        changeColor2(x);
        X = 1;
    }
    else if(y != 0 && Y == 1){
        el1.style.background = "white";
        el1 = element;
        
        eraseColor();
        changeColor(y);
    }
    else if (x != 0 && X == 1)
    {
        el2.style.background = "white";
        el2 = element;
        eraseColor();
        changeColor2(x);
    }
    
    element.style.background = "green"
};

function changeColor(y)
{
    var table = document.getElementById('test')
    for (var i = 0, row; row = table.rows[i]; i++) {

        for (var j = 0, col; col = row.cells[j]; j++) {
            if(j == y)
                col.style.background = "red"
        }  
    }

};

function changeColor2(y)
{
    var table = document.getElementById('test')
    for (var i = 0, row; row = table.rows[i]; i++) {

        for (var j = 0, col; col = row.cells[j]; j++) {
            if(i == x)
                col.style.background = "red"
        }  
    }

};

function eraseColor()
{
    var table = document.getElementById('test')
    for (var i = 0, row; row = table.rows[i]; i++) {

        for (var j = 0, col; col = row.cells[j]; j++) {
                col.style.background = "white"
        }  
    }

}