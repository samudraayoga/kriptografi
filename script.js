// Toggle between Caesar and Vigenère inputs
function toggleInputs() {
    const algorithm = document.getElementById('algorithm').value;
    const caesarInput = document.getElementById('caesar-input');
    const vigenereInput = document.getElementById('vigenere-input');

    if (algorithm === 'caesar') {
        caesarInput.style.display = 'block';
        vigenereInput.style.display = 'none';
    } else {
        caesarInput.style.display = 'none';
        vigenereInput.style.display = 'block';
    }
}

// Caesar Cipher Function
function caesarCipher(str, shift) {
    shift = shift % 26;
    if (shift < 0) shift = 26 + shift;

    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

// Vigenère Cipher Function
function vigenereCipher(str, key, encrypt = true) {
    key = key.toLowerCase();
    let j = 0; // Key index tracker

    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            const shift = key[j % key.length].charCodeAt(0) - 97;
            j++;
            const adjustedShift = encrypt ? shift : -shift;
            return String.fromCharCode(((code - base + adjustedShift + 26) % 26) + base);
        }
        return char;
    }).join('');
}

// Encrypt Function
function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const algorithm = document.getElementById('algorithm').value;
    let result = '';

    if (algorithm === 'caesar') {
        const shift = parseInt(document.getElementById('shift').value);
        result = caesarCipher(inputText, shift);
    } else if (algorithm === 'vigenere') {
        const key = document.getElementById('vigenereKey').value;
        result = vigenereCipher(inputText, key, true);
    }

    document.getElementById('resultText').innerHTML = "";

    for (let i = 0; i < result.length; i++) {
        setTimeout(() => {
            document.getElementById('resultText').append(result[i]);
        }, 30 * i);
    }
}

// Decrypt Function
function decryptText() {
    const inputText = document.getElementById('inputText').value;
    const algorithm = document.getElementById('algorithm').value;
    let result = '';

    if (algorithm === 'caesar') {
        const shift = parseInt(document.getElementById('shift').value);
        result = caesarCipher(inputText, -shift);
    } else if (algorithm === 'vigenere') {
        const key = document.getElementById('vigenereKey').value;
        result = vigenereCipher(inputText, key, false);
    }

    document.getElementById('resultText').innerHTML = "";

    for (let i = 0; i < result.length; i++) {
        setTimeout(() => {
            document.getElementById('resultText').append(result[i]);
        }, 30 * i);
    }
}