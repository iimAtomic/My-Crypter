
    const encryptButton = document.getElementById("encryptButton");
    const decryptButton = document.getElementById("decryptButton");
    const qrCodeDiv = document.getElementById("qrCode");
    const encryptHistory = document.getElementById("encryptHistory");
    const decryptHistory = document.getElementById("decryptHistory");

    const historyEncrypt = [];
    const historyDecrypt = [];

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

    encryptButton.onclick = () => {
    const text = document.getElementById("textInput").value.trim();
    if (text === '') {
    alert("Veuillez entrer un texte à crypter !");
    return;
}
    const encrypted = caesarCipher(text, 3);
    document.getElementById("encryptedText").textContent = encrypted;

    QRCode.toCanvas(document.createElement("canvas"), encrypted, (err, canvas) => {
    if (!err) {
    qrCodeDiv.innerHTML = "";
    qrCodeDiv.appendChild(canvas);
}
});

    historyEncrypt.push(encrypted);
    encryptHistory.textContent = `Historique: ${historyEncrypt.slice(-5).join(" | ")}`;
};

    decryptButton.onclick = () => {
    const text = document.getElementById("decryptInput").value.trim();
    if (text === '') {
    alert("Veuillez entrer un texte à décrypter !");
    return;
}
    const decrypted = caesarCipher(text, -3);
    document.getElementById("decryptedText").textContent = decrypted;
    historyDecrypt.push(decrypted);
    decryptHistory.textContent = `Historique: ${historyDecrypt.slice(-5).join(" | ")}`;
};

    function CopyFunctionEncrypt(event) {
    event.preventDefault();
    navigator.clipboard.writeText(document.getElementById("encryptedText").textContent);
}

    function CopyFunctionDecrypt(event) {
    event.preventDefault();
    navigator.clipboard.writeText(document.getElementById("decryptedText").textContent);
}

    function downloadEncryptedText(event) {
    event.preventDefault();
    const text = document.getElementById("encryptedText").textContent;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "texte_crypte.txt";
    link.click();
}

