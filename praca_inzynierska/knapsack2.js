var keyLenght = 0;
var array_A = [];
var array_B = [];
var arrayBString = '';
var randomSum = 0;
var plainText = '';
var plainTextBits ='';
var plainTextBitsNoSpace = '';
var plainTextBitsNoSpaceLenght = 0;
var sum = 0;
var multiplier = 0;
var cipherArray = [];
var cipherArrayString = '';
var decryptedArray = [];
var inverse;
var decryptedArrayBits = [];

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
			//alert(sum);
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

function moduloInverse(number, modulo)				//number nad modulo are coprime
{
	if(coprimeTest(number, modulo) == 1)
	{
		var mod = modulo;
		var t, q;
		var x0 = 0;
		var x1 = 1;
		
		if(modulo == 0)
		{
			return 0;
		}
		while(number > 1)
		{
			q = parseInt(number / modulo);
			t = modulo;
			
			modulo = number % modulo;
			number = t;
			t = x0;
			x0 = x1 - q * x0;
			x1 = t;
		}
		if(x1 < 0)
			x1 += mod;
		return parseInt(x1);
	}
	else{
		alert('not coprime');
		return 0;
	}
}

function decrypt()
{
	inverse = moduloInverse(multiplier, sum);
	var decryptedArrayBitsText = '';
	//alert(inverse); 
	for(var i = 0; i < cipherArray.length; i++)
	{
		decryptedArray[i] = (inverse * cipherArray[i]) % sum;
		alert(decryptedArray[i]); 
	}
	//var decryptedArrayCopy = decryptedArray;
	var test = document.getElementById('plain_text').value;
	test.toString();
	alert(test.length*8);
	for(var k = 0; k < test.length*8; k++)
	{
		for(j = 0; j < array_A.lenght; j++)
		{
			alert('test');
			if(decryptedArray[j] > array_A[(array_B.length - j - 1)])
			{
				alert('1');
				decryptedArray[j] = decryptedArray[j] - array_A[array_A.length - j - 1];
				decryptedArrayBits[(k + 1) * j] = 1;
				decryptedArrayBitsText = '1'.concat(decryptedArrayBitsText);
			}
			else
			{
				alert('0');
				decryptedArrayBits[(k + 1) * j] = 0;
				decryptedArrayBitsText += '0'.concat(decryptedArrayBitsText);
			}
			//alert(decryptedArrayBitsText[(k + 1) * j]);
		}
		
	}


	document.getElementById('decrypted_text').value = decryptedArrayBitsText;

}


