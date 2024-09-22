    $(document).ready(function() {
        loadTasks(); 

        function loadTasks() {
            $.ajax({
                url: "others/displayTask.php",
                method: "POST",
                success: function(data) {
                    const tasks = JSON.parse(data);
                    $("#list-holder").empty(); 
                    tasks.forEach(task => {
                        createTask(task.title, task.id); 
                    });
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function createTask(taskValue, taskId) {
            if (taskValue === "") return;

            let taskItem = $("<div>", { class: "task-item", "data-task-id": taskId }); 
            let checkbox = $("<input>", { type: "checkbox", class: "task-checkbox" });
            let textSpan = $("<span>", { class: "task-text", text: taskValue });
            let delButton = $("<button>", { text: "Delete", class: "delete-button" });

            taskItem.append(checkbox).append(textSpan).append(delButton);

            delButton.on("click", function() {
                deleteToDatabase(taskId, textSpan.text());
            });

            $("#list-holder").append(taskItem); 
        }

        $("#list-form").on("submit", function(event) { 
            event.preventDefault();
            const taskTitle = $("#add-taskField").val();
            addToDatabase(taskTitle);
        });

        function addToDatabase(taskTitle) {
            $.ajax({
                url: "others/addTask-db.php",
                method: "POST",
                data: {title: taskTitle},
                success: function() {
                    loadTasks();
                    $("#add-taskField").val(""); 
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function deleteToDatabase(taskId, taskTitle) {
            $.ajax({
                url: "others/deleteTask-db.php",
                method: "POST",
                data: {
                    id: taskId,
                    title: taskTitle},
                success: function() {
                    loadTasks();
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }
    });
