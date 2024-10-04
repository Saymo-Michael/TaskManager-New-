<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <link rel="stylesheet" href="css/style.css">
    <title>Task Manager</title>
</head> 

<body>
    <div class="task-list">
        <h1>To-Do List:</h1>
        
        <div class="list-holder" id="list-holder"></div>

        <h2>Completed Tasks</h2>
        <div class="completedList-holder" id="completedList-holder"></div>
        
    </div>

    <div class="task-details">
        <form id="details-form" method="post">
            <input type="hidden" id="task-id" name="task-id">

            <label for="title" class="task-label">Task Details</label>
            <input type="text" id="title" name="title" placeholder="Enter Title">

            <label for="description" class="description-label">Description</label>
            <textarea id="description" name="description" placeholder="..."></textarea>

            <label for="due_date" class="due_date-label">Due:</label>
            <input type="date" id="due_date" name="due_date">

            <button type="submit" id="save-button">SAVE</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="javascript/script.js"></script>
</body>
</html>
