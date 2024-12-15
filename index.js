function caesarCipher(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let newIndex = (alphabet.indexOf(char) + shift) % 26;
            if (newIndex < 0) newIndex += 26;
            result += alphabet[newIndex];
        } else if (alphabetUpper.includes(char)) {
            let newIndex = (alphabetUpper.indexOf(char) + shift) % 26;
        if (newIndex < 0) newIndex += 26;
            result += alphabetUpper[newIndex];
        } else {
            result += char;
        }
    }
    return result;
}

// Crypter
document.getElementById('encryptButton').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value.trim();
    if (textInput === '') {
        alert("Veuillez entrer un texte à crypter !");
        return;
    }
    document.getElementById('encryptedText').textContent = caesarCipher(textInput, 3);
});

// Décrypter
document.getElementById('decryptButton').addEventListener('click', () => {
    const decryptInput = document.getElementById('decryptInput').value.trim();
    if (decryptInput === '') {
        alert("Veuillez entrer un texte à décrypter !");
        return;
    }
    document.getElementById('decryptedText').textContent = caesarCipher(decryptInput, -3);
});
