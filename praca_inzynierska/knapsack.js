function toggle_visibility(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'block')
		object.style.display = 'none';
	else
		object.style.display = 'block';
}

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
var decryptedArrayBitsText = '';
var decryptedArrayBitsBytes = [];


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
			randomSum  = randomSum + array_A[i];
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
			//createCipher();
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
	var iterator = 0;
	var iterator2 = 0;
	var characterFlag = 0;
	var sum = 0;
	var sumFlag = 0;
	while(iterator < plainTextBitsNoSpace.length)
	{
		sumFlag = 1;
		if(plainTextBitsNoSpace[iterator] == '1')
		{	
			sum = sum + array_B[(iterator) % keyLenght];
			
		}
		if((iterator + 1) % keyLenght == 0)
		{
			alert('test2 ' + sum);
			cipherArray[iterator2] = sum;
			cipherArrayString += cipherArray[iterator2] + " ";
			iterator2++;
			sum = 0;
			sumFlag = 0;
		}
		iterator++;
	}	
	if(sumFlag == 1)
	{
		cipherArray[iterator2] = sum;
		cipherArrayString += cipherArray[iterator2] + " ";
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
	var inversedEncryptedArray = '';
	inverse = moduloInverse(multiplier, sum);
	for(var i = 0; i < cipherArray.length; i++)
	{
		decryptedArray[i] = (inverse * cipherArray[cipherArray.length -1 - i]) % sum;
		alert(decryptedArray[i]); 
		inversedEncryptedArray += decryptedArray[i] + " ";
	}
	document.getElementById('decrypted_text_2').value = inversedEncryptedArray;
	var decryptedArrayElement = 0;
	var loopCounter = 0;
	var shift = array_A.length * decryptedArray.length - plainTextBitsNoSpace.length;
	var shift2 = shift;
	alert(shift + 'shift');
	for(var k = 0; k < plainTextBitsNoSpace.length; k++)
	{
			alert('indek' + (array_A.length - shift - loopCounter - 1) + ' wartosc '+ array_A[(array_A.length - shift - loopCounter - 1)%keyLenght] + ' ' + decryptedArray[j]);
			
			if(decryptedArray[decryptedArrayElement] >= array_A[(array_A.length - shift - loopCounter - 1)%keyLenght])
			{
				decryptedArray[decryptedArrayElement] = decryptedArray[decryptedArrayElement] -(array_A[(array_A.length - shift - loopCounter - 1)%keyLenght]);
				decryptedArrayBits[k] = 1;
				decryptedArrayBitsText = '1'.concat(decryptedArrayBitsText);
			}
			else
			{
				decryptedArrayBits[k] = 0;
				decryptedArrayBitsText = '0'.concat(decryptedArrayBitsText);
			}
			if((k + shift2 + 1) % keyLenght == 0)
			{	
				/*if(shift != 0)
				{
					shift = 0;
					//z = (keyLenght - shift + 1)%keyLenght;
				}	*/
				alert('przeskok' + loopCounter);
				decryptedArrayElement++;
				//shift = 0;
			}
			if(loopCounter == array_A.length - 1 - shift)
			{	
				if(shift != 0){
					shift =0;
				}
				alert('z ->0');
				loopCounter = 0;
			}
			else
			{
				loopCounter++;
				
			}
	}

	document.getElementById('decrypted_text').value = decryptedArrayBitsText;
	decryptedArrayBitsToByteArray();

}

function decryptedArrayBitsToByteArray()
{
	var i = 0;
	decryptedArrayBitsBytes[i] = "";
	for(var j = 0; j < decryptedArrayBitsText.length; j++)
	{
		decryptedArrayBitsBytes[i] += decryptedArrayBitsText[j];
		if( (j + 1)%8 == 0 && (j+1) != decryptedArrayBitsText.length)
		{
			i++;
			decryptedArrayBitsBytes[i] = "";
		}
	}
	document.getElementById('decrypted_text_text').value = bin2String(decryptedArrayBitsBytes);
}

function bin2String(array) 
{
	var result = "";
	for (var i = 0; i < array.length; i++) {
		result += String.fromCharCode(parseInt(array[i], 2));
	}
	return result;
}



