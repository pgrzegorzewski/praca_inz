var keyLenght = 0;
var array_A = [];
var array_B = [];
var arrayBString = '';
var randomSum = 0;
var plainText = '';
var plainTextBits ='';
var plainTextBitsNoSpace = '';
var sum = 0;
var multiplier = 0;
var cipherArray = [];
var cipherArrayString = '';

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
	sum = 0;
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

function convert(plainText) 
{  
	var letterBinary;
    for (i = 0; i < plainText.length; i++) 
	{
		letterBinary = plainText[i].charCodeAt(0).toString(2);
		if(letterBinary.length < 8)
		{
			for(j = 0; j < 8 - letterBinary.length; j++)
				letterBinary = '0'.concat(letterBinary);
		}
     	//plainTextBits += plainText[i].charCodeAt(0).toString(2) + " ";//
		plainTextBits +=letterBinary + " ";
		plainTextBitsNoSpace += letterBinary;
    }
}

function setPlainText()
{
	plainText = document.getElementById('plain_text').value;
	convert(plainText);
	document.getElementById('plain_text_bits').value = plainTextBits;
	
}

function setMultiplier()
{
		multiplier = document.getElementById('multiplier').value;
		alert(sum + ' ' + multiplier);
		
		if(coprimeTest(sum, multiplier) == 1)						//?
		{
			multiplier = document.getElementById('multiplier').value;
			alert('coprime');
			setPublicKey();
			createCipher();
		}
		else
		{
			alert("not coprime");
		}
		
}

function coprimeTest(a, b)
{
    if (b == 0)
       return a; 
    else
       return coprimeTest(b, a % b);
}

function setPublicKey()
{
	arrayBString = '';
	for (i = 0; i < keyLenght; i++) {
     	array_B[i] = (array_A[i] * multiplier) % sum;
		arrayBString += array_B[i] + " ";
		
    }
	document.getElementById('key_setB').value = arrayBString;	
}

function createCipher()
{
	var iterator = 1;
	var iterator2 = 0;
	var characterFlag = 0;
	var sum = 0;
	while(iterator < plainTextBitsNoSpace.length + 1)
	{
		if(plainTextBitsNoSpace[iterator - 1] == '1')
		{	
			sum = sum + array_B[(iterator - 1) % keyLenght];
			alert(sum);
			//cipherArray[iterator2] += array_B[iterator - 1];
		}
		if(iterator % keyLenght == 0)
		{
			cipherArray[iterator2] = sum;
			cipherArrayString += cipherArray[iterator2] + " ";
			iterator2++;
			sum = 0;
		}
		iterator++;
	}	
	document.getElementById('cipher').value = cipherArrayString;
	
}