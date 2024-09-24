<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $title = $_POST["title"];

    if (trim($title) === "") {
        exit();
    }

    try {
        require_once "db.php";

        //Search
        $query = "SELECT * FROM completedTasks WHERE id = ?;";
        $stmnt = $connection->prepare($query);

        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt->bind_param("i", $id);
        $stmnt->execute();

        $result = $stmnt->get_result();
        $row = $result->fetch_assoc();


        //Transfer  
        $query = "INSERT INTO ongoingTasks VALUES (?, ?, ?, ?);";
        $stmnt = $connection->prepare($query);

        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt->bind_param("isss", $id, $title, $row["description"], $row["date"]);
        $stmnt->execute();


        //Delete
        $query = "DELETE FROM completedTasks WHERE id = ? && title = ?;";
        $stmnt = $connection->prepare($query);
        
        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }
    
        $stmnt->bind_param("is", $id, $title);
        $stmnt->execute();

        $stmnt->close();
        $connection->close();

    } catch (mysqli_sql_exception $e) {
        die("Connection Failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}