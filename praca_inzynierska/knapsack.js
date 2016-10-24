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
var totalSumModulus = 0;
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

/*		FLAGS		*/
var isKeyLenght = 0;
var isMultiplier = 0;
var isPlaintText = 0;
var isEncryptedText = 0;



function clearTextarea(name)
{
	 document.getElementById(name).value = '';
}


function setKeyLenght()
{
	if(isKeyLenght == 1)
	{
		array_A.length = 0;
		array_B.length = 0;
		totalSumModulus = 0;
		clearEncryptionTextAreas();
		clearDecryptionTextAreas();
	}
	isKeyLenght = 1;
	keyLenght = document.getElementById('keyLenght').value;
	generateRandomArrayA(keyLenght);
	gettotalSumModulus();
	document.getElementById('key_setA').value = array_A;
	enableEncryptButton();
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

function gettotalSumModulus()
{
	for(var i = 0; i < keyLenght; i++)
	{
			totalSumModulus  = totalSumModulus + array_A[i];
	}
	document.getElementById('key_setA_random_sum').value = totalSumModulus;
}

function convert(plainText) 
{  
	var letterBinary;
    for (i = 0; i < plainText.length; i++) 
	{
		letterBinary = plainText[i].charCodeAt(0).toString(2);
		if(letterBinary.length < 8)
		{
			for(j = 0; j <= 8 - letterBinary.length; j++)
				letterBinary = '0'.concat(letterBinary);
		}
     	//plainTextBits += plainText[i].charCodeAt(0).toString(2) + " ";//
		plainTextBits +=letterBinary + " ";
		plainTextBitsNoSpace += letterBinary;
		
    }
}

function setPlainText()
{
	clearDecryptionTextAreas();
	if(isPlaintText == 1)
	{
		plainTextBitsNoSpace = '';
		plainText = '';
		plainTextBits = '';
		clearTextarea('cipher');
		clearTextarea('plain_text_bits');
		cipherArray.lenght = 0;
	}
	plainText = document.getElementById('plain_text').value;
	convert(plainText);
	document.getElementById('plain_text_bits').value = plainTextBits;
	isPlaintText = 1;
	enableEncryptButton();
}

function clearEncryptionTextAreas()
{
	clearTextarea('key_setA_random_sum');
	clearTextarea('key_setA');
	clearTextarea('multiplier');
	clearTextarea('key_setB');
	clearTextarea('cipher');
	cipherArray.lenght = 0;
	
}

function setMultiplier()
{
	if(isMultiplier == 1)
	{
		clearTextarea('key_setB');
		clearDecryptionTextAreas();
	}
	isMultiplier = 1;
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
	safety();
	enableEncryptButton();
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
	array_B.length = 0;
	arrayBString = '';
	for (i = 0; i < keyLenght; i++) {
     	array_B[i] = (array_A[i] * multiplier) % sum;
		arrayBString += array_B[i] + " ";
		
    }
	document.getElementById('key_setB').value = arrayBString;	
}

function enableEncryptButton()
{
	if(isPlaintText == 1 && isKeyLenght == 1 && isMultiplier == 1)
	{
		document.getElementById('encryptButton').disabled = false;
	}
}

function enableDecryptButton()
{
	if(isEncryptedText == 1)
	{
		document.getElementById('decryptButton').disabled = false;
	}
}

function clearDecryptionTextAreas()
{
	clearTextarea('decrypted_text_2');
	clearTextarea('decrypted_text');
	clearTextarea('decrypted_text_text');
	cipherArrayString = '';
	cipherArray.length = 0;
	decryptedArray.length = 0;
	decryptedArrayBits.length = 0;
	plainTextBitsNoSpace.length = 0;
	decryptedArrayBitsText = '';
	decryptedArrayBitsText.length = 0;

}


function createCipher()
{
	clearDecryptionTextAreas();
	clearTextarea('cipher');
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
	isEncryptedText = 1;
	enableDecryptButton();
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
	clearTextarea('decrypted_text_2');
	clearTextarea('decrypted_text');
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
					shift = 0;
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
	clearTextarea('decrypted_text_text');
	var i = 0;
	decryptedArrayBitsBytes.length = 0;
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


function safety()
{
	var keySpace = Math.pow(2,keyLenght);
	document.getElementById('key_space').innerHTML = "Key space for the given key is equal: " + keySpace;
	textShow('key_space');
}

function textShow(name) {
    $('#' + name).show(300)
};


