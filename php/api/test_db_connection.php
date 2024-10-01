<?php
    // TODO : A compléter ces variables pour que la connection string devienne opérationnelle.
    $servername = "db:3306";
    $username = "telegraph_user";
    $password = "telegraph_pwd";
    $dbname = "db_telegraph";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Test réussi, la base de données db_telegraph est accessible";
    } 
    catch(PDOException $e) {
        echo "Test échoué, la base de données db_telegraph est inaccessible: " . $e->getMessage();
    }
?>