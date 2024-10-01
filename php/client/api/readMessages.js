
async function readMessages() {
    try {
        const url = "http://localhost/api/getMessages.php"; // TODO : A compléter l'URL backend de la fonction pour lire les messages dans la base de données.
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des messages.');
        }
        const messages = await response.json();
        console.log('Messages reçus :');
        console.log(messages);
        
        const messagesDiv = document.getElementById('idMessages');
        messagesDiv.innerHTML = "";
        
        const table = document.createElement("table");
        messagesDiv.appendChild(table);
        const headerRow = document.createElement("tr");
        
        const thIp = document.createElement("th");

        thIp.textContent = "IP Source";
        headerRow.appendChild(thIp);
        
        const thMessage = document.createElement("th");
        thMessage.textContent = "Messages";
        headerRow.appendChild(thMessage);
        
        table.appendChild(headerRow);
        
        messages.forEach(m => {
            
            // TODO : à compléter on souhaite afficher chacun des messages dans la table (une row par message, 
            // une colonne pour l'ip et une colonne pour le message construit à partir des ses caractères reconcaténés.
            const row = document.createElement("tr");

            const ipCell = document.createElement("td");
            ipCell.textContent = m.ip;  // Assuming 'm.ip' is the IP address
            row.appendChild(ipCell);

            const messageCell = document.createElement("td");
            messageCell.textContent = m.characters.join('');  // Assuming 'm.characters' is an array of characters
            row.appendChild(messageCell);

            table.appendChild(row);

        });
        
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}

// Toutes les 10 secondes, on collecte les message de la base de données.
setInterval(readMessages, 10000);

// Avec une lecture initiale...
document.addEventListener('DOMContentLoaded', readMessages);
