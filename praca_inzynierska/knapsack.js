var keyLenght = 0;
var array_A = [];
var randomSum = 0;
var plainText = '';
var plainTextBits ='';

function setKeyLenght()
{
	keyLenght = document.getElementById('keyLenght').value;
	//alert(keyLenght);
	generateRandomArrayA(keyLenght);
	getRandomSum();
	document.getElementById('key_setA').value = array_A;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomArrayA(keyLenght)
{
	var sum = 0;
	for(var i = 0; i < keyLenght; i++)
	{
		array_A[i] = parseInt(getRandomArbitrary(1, 100) + sum);
		//alert(array_A[i]);
		sum = sum + array_A[i];
	}
}

function getRandomSum()
{
	for(var i = 0; i < keyLenght; i++)
	{
		if(parseInt(getRandomArbitrary(0 ,2)) == 0)
		{
			randomSum  = randomSum + array_A[i];
		}
	}
	document.getElementById('key_setA_random_sum').value = randomSum;
}

function convert(plainText) {  

    for (i = 0; i < plainText.length; i++) {
     	plainTextBits += plainText[i].charCodeAt(0).toString(2) + " ";
    }
}

function setPlainText()
{
	plainText = document.getElementById('plain_text').value;
	convert(plainText);
	document.getElementById('plain_text_bits').value = plainTextBits;
	
}