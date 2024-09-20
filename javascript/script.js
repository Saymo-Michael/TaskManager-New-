$(document).ready(function() {
    loadTasks(); 

    function loadTasks() {
        $.ajax({
            url: 'others/displayTask.php',
            method: 'POST',
            success: function(data) {
                const tasks = JSON.parse(data);
                $('#list-holder').empty(); 
                tasks.forEach(task => {
                    addTask(task.title, task.id); 
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching tasks:", status, error);
            }
        });
    }

    function addTask(taskValue, taskId) {
        if (taskValue === "") return;

        // Create elements using jQuery
        let taskItem = $('<div>', { class: 'task-item', 'data-task-id': taskId }); 
        let checkbox = $('<input>', { type: 'checkbox', class: 'task-checkbox' });
        let textSpan = $('<span>', { class: 'task-text', text: taskValue });
        let delButton = $('<button>', { text: 'Delete', class: 'delete-button' });

        // Append elements
        taskItem.append(checkbox).append(textSpan).append(delButton);

        // Attach event handlers for delete
        delButton.on('click', function() {
            deleteTask(taskId, taskItem);
        });

        $('#list-holder').append(taskItem); // Append to the list-holder
    }

    function deleteTask(taskId, taskElement) {
        $.post('contains/deleteTask.php', { id: taskId }, function(response) {
            if (response.success) {
                taskElement.remove(); // Remove task element
            } else {
                console.error("Failed to delete task");
            }
        }, 'json').fail(function(error) {
            console.error("Error:", error);
        });
    }
});
