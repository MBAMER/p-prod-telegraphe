<?php

if ($_SERVER["REQUEST_METHOD"] == /* */) { // TODO : A compléter, quelle est la methode HTTP qui permet d'envoyer une donnée ?
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    
    if (isset($_POST['charAscii'])) {
        
        
        $charAscii = $_POST['charAscii'];       
        $ipSender = $_SERVER['REMOTE_ADDR'];

        // TODO : A compléter ces variables pour que la connection string devienne opérationnelle.
        $servername = "...";
        $username = "...";
        $password = "...";
        $dbname = "...";
        
        // TODO : A compléter quelle est la valeur décimale de STX et de EOT
        $STX = ...;
        $EOT = ...;

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            
            if (/* */) { // TODO : A compléter : comment pourrait-on savoir que l'utilisateur à démarrer un nouveau message ?
                
                // TODO : A compléter :
                // Nous souhaitons insérer dans la table t_message la valeur de l'adresse IP de l'expéditeur.
                // --> Préparation et envoi de la requête SQL.
                
                
                // Récupérer l'ID du nouveau message
                $idMessage = $conn->lastInsertId();

                // Insérer le STX dans t_character avec l'ID du nouveau message
                $sql = "INSERT INTO t_character (idMessage, charAscii) VALUES (:idMessage, :charAscii)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idMessage', $idMessage);
                $stmt->bindParam(':charAscii', $charAscii);
                $stmt->execute();

                // Répondre avec succès
                echo json_encode(array('message' => 'STX inséré avec succès.', 'idMessage' => $idMessage));
            } 
            else {                
            
                // Pour déterminer si un message est en cours. On va sélectioner le dernier idMessage envoyé par l'utilisateur (les valeurs des id sont chronologiques)                
                $sql = "..."; // TODO : A compléter 
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':mesIPSender', $ipSender);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // TODO : A compléter. Peut-être faut-il tester $row avant d'accéder à son contenu ?
                $idMessage = $row['idMessage'];                

                $sql = "SELECT 
                            (SELECT COUNT(*) FROM t_character WHERE idMessage = :idMessage AND charAscii = :STX) AS nbSTX,
                            (SELECT COUNT(*) FROM t_character WHERE idMessage = :idMessage AND charAscii = :EOT) AS nbEOT";
                            
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idMessage', $idMessage);
                $stmt->bindParam(':STX', $STX);
                $stmt->bindParam(':EOT', $EOT);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                $nbSTX = $row['nbSTX'];
                $nbEOT = $row['nbEOT'];

                
                // Si un message est en cours, on le sait car STX (Start of TeXt) existe au moins une fois, mais que EOT (End Of Transmission) n'a pas été compté.                
                if (/* TODO : A compléter */) { // Pour un message en cours...
                    
                    /* TODO : A compléter : on aimerait rajouter à la table t_character le dernier caractère reçu */
                    $sql = "...";
                    /* ... */
                    
                    $stmt->execute();

                    // Répondre avec succès
                    header('Content-Type: application/json');
                    if ($charAscii == $EOT){                        
                        echo json_encode(array('message' => 'Message terminé par EOT avec succès.', 'idMessage' => $idMessage));
                    }
                    else{
                        echo json_encode(array('message' => 'Caractère inséré avec succès.', 'idMessage' => $idMessage));
                    }
                } else {
                    // Répondre avec une erreur si aucun STX n'a été trouvé                    
                    echo json_encode(array(
                        'error' => 'Aucun STX trouvé pour le message en cours.',
                        'nbSTX' => $nbSTX,
                        'nbEOT' => $nbEOT
                    ));
                }
            }

        } 
        catch(PDOException $e) {
            // En cas d'erreur de connexion ou d'insertion
            echo json_encode(array('error' => 'Erreur de base de données : ' . $e->getMessage()));
        }

        // Fermer la connexion à la base de données
        $conn = null;

    } else {
        // Si le champ charAscii est manquant dans les données POST
        echo json_encode(array('error' => 'Le champ charAscii est manquant.'));
    }
} else {
    // Si la requête n'est pas de type POST
    echo json_encode(array('error' => 'Méthode non autorisée.'));
}
?>
