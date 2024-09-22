<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST["title"];

    if (trim($title) === "") {
        exit();
    }

    try {
        require_once "db.php";

        $query = "INSERT INTO ongoingTasks (title) VALUES (?);";
        $stmnt = $connection->prepare($query);

        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt->bind_param("s", $title);
        $stmnt->execute();

        $stmnt->close();
        $connection->close();

    } catch (mysqli_sql_exception $e) {
        die("Connection Failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}