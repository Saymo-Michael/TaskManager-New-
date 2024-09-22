<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $title = $_POST["title"];

    try {
        require_once "db.php";
    
        $query = "DELETE FROM ongoingTasks WHERE id = ? && title = ?;";
        $stmnt = $connection->prepare($query);
        
        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }
    
        $stmnt->bind_param("is", $id, $title);
        $stmnt->execute();
    
        $stmnt->close();
        $connection->close();
    
        header("Location: ../index.php");
        die();

    } catch (mysqli_sql_exception $e) {
        die("Connection Failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}