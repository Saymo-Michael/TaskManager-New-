<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];
    $description = $_POST["description"];
    $date = $_POST["date"];
    $taskId = $_POST["id"];
    
    if (trim($title) === "") {
        exit();
    }

    try {
        require_once "db.php";

        $query = "UPDATE ongoingTasks SET `title` = ?, `description` = ?, `date` = ? WHERE id = ?";
        $stmnt = $connection->prepare($query);

        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt->bind_param("sssi", $title, $description, $date, $taskId); 
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