function sendCharacter(charAscii) {
    const url = "http://localhost/api/saveMessage.php"; // TODO : A compléter l'URL backend de la fonction pour lire les messages dans la base de données.
    const encodedCharAscii = encodeURIComponent(charAscii);
    console.log("sendCharacter:", encodedCharAscii);
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // TODO implémenter le body de la méthod (on souhaite envoyer charAscii), il est important d'encoder correctement l'URI
        body: 'charAscii=' + encodedCharAscii
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            
            // TODO : on aimerait voir la data dans la console du navigateur
            console.log('Data:', data); // Log data in console

            // Si la data a un message, on souhaite afficher dans une alert la réussite et le message
            if (data.message) {
                alert(`Success: ${data.message}`); // Success message
            
            // Si parcontre la data a une error, alors on souhaite afficher une alert "Error : ..." avec l'erreur obtenue
            } else if (data.error) {
                alert(`Error: ${data.error}`); // Error message
            }
            
            
        } catch (error) {
            console.error('Error parsing JSON:', error, 'Response text:', text);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}