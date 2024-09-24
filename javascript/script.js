    $(document).ready(function() {
        loadOngoingTasks(); 
        loadCompletedTasks();

        function loadOngoingTasks() {
            $.ajax({
                url: "others/displayOngoingTask.php",
                method: "POST",
                success: function(data) {
                    const tasks = JSON.parse(data);
                    $("#list-holder").empty(); 
                    tasks.forEach(task => {
                        createOngoingTask(task.title, task.id); 
                    });
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function loadCompletedTasks() {
            $.ajax({
                url: "others/displayCompletedTask.php",
                method: "POST",
                success: function(data) {
                    const tasks = JSON.parse(data);
                    $("#completedList-holder").empty(); 
                    tasks.forEach(task => {
                        createCompletedTask(task.title, task.id); 
                    });
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function createOngoingTask(taskValue, taskId) {
            if (taskValue === "") return;

            let taskItem = $("<div>", { class: "task-item", "data-task-id": taskId }); 
            let checkbox = $("<input>", { type: "checkbox", class: "task-checkbox" });
            let textSpan = $("<span>", { class: "task-text", text: taskValue });
            let delButton = $("<button>", { text: "Delete", class: "delete-button" });

            taskItem.append(checkbox).append(textSpan).append(delButton);

            taskItem.on("click", function(event) {
                if (event.target !== delButton && event.target !== checkbox) {
                    searchToDatabase(taskId);
                }
            });

            checkbox.on("click", function() {
                transferToCompleted(taskId, textSpan.text());
            });

            delButton.on("click", function() {
                deleteToDatabase(taskId, textSpan.text());
            });

            $("#list-holder").append(taskItem); 
        }

        function createCompletedTask(taskValue, taskId) {
            if (taskValue === "") return;

            let taskItem = $("<div>", { class: "task-item", "data-task-id": taskId }); 
            let checkbox = $("<input>", { type: "checkbox", class: "task-checkbox" });
            let textSpan = $("<span>", { class: "task-text", text: taskValue });
            let delButton = $("<button>", { text: "Delete", class: "delete-button" });

            taskItem.append(checkbox).append(textSpan).append(delButton);
            checkbox[0].checked = true;

            checkbox.on("click", function() {
                transferToOngoing(taskId, textSpan.text());
            });

            delButton.on("click", function() {
                deleteToDatabase(taskId, textSpan.text());
            });

            $("#completedList-holder").append(taskItem); 
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
                    loadOngoingTasks(); 
                    loadCompletedTasks();
                    clearTaskDetails();
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
                    loadOngoingTasks(); 
                    loadCompletedTasks();
                    clearTaskDetails();
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function searchToDatabase(taskId) {
            $.ajax({
                url: "others/searchTask-db.php",
                method: "POST",
                data: {id: taskId},
                success: function(data) {
                    const row = JSON.parse(data);
                    displayTaskDetails(row);
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function displayTaskDetails(row) {
            if (!row) {
                console.error("No task data received");
                return;
            }
            
            $("#title").val(row.title);
            $("#description").val(row.description || "");
            $("#due_date").val(row.date || "");
        }

        $(document).on("mousedown", function(event) {
            $components =  $("#title").is(event.target) || $("#description").is(event.target) || $("#due_date").is(event.target) || $("#save-button").is(event.target)
                    || $("#list-form").is(event.target) || $("#details-form").is(event.target);
            if (!$components) {
                clearTaskDetails();
            }
        });
         
        function clearTaskDetails() {
            $("#title").val("");
            $("#description").val("");
            $("#due_date").val("");
        }

        function transferToCompleted(taskId, taskTitle) {
            $.ajax({
                url: "others/transferToCompleted.php",
                method: "POST",
                data: {
                    id: taskId,
                    title: taskTitle},
                success: function() {
                    loadOngoingTasks(); 
                    loadCompletedTasks();
                    clearTaskDetails();
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

        function transferToOngoing(taskId, taskTitle) {
            $.ajax({
                url: "others/transferToOngoing.php",
                method: "POST",
                data: {
                    id: taskId,
                    title: taskTitle},
                success: function() {
                    loadOngoingTasks(); 
                    loadCompletedTasks();
                    clearTaskDetails();
                },
                error: function(status, error) {
                    console.error("Error fetching tasks:", status, error);
                }
            });
        }

    });
