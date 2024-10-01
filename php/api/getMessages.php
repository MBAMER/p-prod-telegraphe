<?php

if ($_SERVER["REQUEST_METHOD"] == 'GET') { // TODO : À compléter. Quelle méthode HTTP est utilisée pour obtenir des données d'un serveur ?

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    // TODO : A compléter ces variables pour que la connection string devienne opérationnelle.
    $servername = "db:3306";
    $username = "telegraph_user";
    $password = "telegraph_pwd";
    $dbname = "db_telegraph";

    try {
        // Connexion à la base de données
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // TODO : A compléter "Il nous faudrait une requête SQL qui nous permette de lire tous les messages (y compris tous leurs caractères)"
        // De plus, nous souhaitons que les messages soient classés dans l'ordre de réception et que les caractères de messages soient aussi ordrés.

        $sql = "SELECT * FROM t_message LEFT JOIN t_caractere ON t_message.message_id = t_caractere.message_id";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        
        $messages = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $idMessage = $row['message_id'];
            if (!isset($messages[$idMessage])) {
                $messages[$idMessage] = [
                    'message_id' => $idMessage,
                    'mesIPSender' => $row['address_ip'],
                    'characters' => []
                ];
            }
            array_push($messages[$idMessage]['characters'], $row['code_ascii']);
        }

        // Répondre avec les données JSON
        echo json_encode(array_values($messages));

    } catch(PDOException $e) {
        echo json_encode(['error' => 'Erreur de base de données : ' . $e->getMessage()]);
    }

    // Fermer la connexion à la base de données
    $conn = null;
} else {
    // Si la requête n'est pas de type GET
    echo json_encode(['error' => 'Méthode non autorisée.']);
}
?>
