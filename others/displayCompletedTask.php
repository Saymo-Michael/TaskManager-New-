<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        require_once "db.php";

        $query = "SELECT * FROM completedTasks;";
        $stmnt = $connection->prepare($query);
        
        if (!$stmnt) {
            die("Prepare failed: " . $connection->error);
        }

        $stmnt->execute();
        $result = $stmnt->get_result();

        $taskList = array();
        while ($row = $result->fetch_assoc()) {
            $taskList[] = $row;
        }
        
        echo json_encode($taskList);

        $stmnt->close();
        $connection->close();

    } catch (mysqli_sql_exception $e) {
        die("Connection Failed: " . $e->getMessage());
    }
} else {
    header("Location: ../index.php");
    exit();
}
