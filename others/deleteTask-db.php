<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $title = $_POST["title"];

    if (trim($title) === "") {
        exit();
    }

    try {
        require_once "db.php";

        $query1 = "DELETE FROM ongoingTasks WHERE id = ? AND title = ?";
        $stmnt1 = $connection->prepare($query1);
        if (!$stmnt1) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt1->bind_param("is", $id, $title);
        $stmnt1->execute();
        $stmnt1->close();

        $query2 = "DELETE FROM completedTasks WHERE id = ? AND title = ?";
        $stmnt2 = $connection->prepare($query2);
        if (!$stmnt2) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt2->bind_param("is", $id, $title);
        $stmnt2->execute();
        $stmnt2->close();

        $connection->close();

        header("Location: ../index.php");
        die();

    } catch (mysqli_sql_exception $e) {
        die("Connection Failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
}