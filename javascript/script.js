$(document).ready(function () {
  loadOngoingTasks();
  loadCompletedTasks();

  function loadOngoingTasks() {
    $.ajax({
      url: "others/displayOngoingTask.php",
      method: "POST",
      success: function (data) {
        const tasks = JSON.parse(data);
        $("#list-holder").empty();
        tasks.forEach((task) => {
          createOngoingTask(task.title, task.id);
        });
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function loadCompletedTasks() {
    $.ajax({
      url: "others/displayCompletedTask.php",
      method: "POST",
      success: function (data) {
        const tasks = JSON.parse(data);
        $("#completedList-holder").empty();
        tasks.forEach((task) => {
          createCompletedTask(task.title, task.id);
        });
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function createOngoingTask(taskValue, taskId) {
    if (taskValue === "") return;

    let taskItem = $("<div>", { class: "task-item", "data-task-id": taskId });
    let checkbox = $("<input>", { type: "checkbox", class: "task-checkbox" });
    let textSpan = $("<span>", { class: "task-text", text: taskValue });
    let delButton = $("<button>", { text: "Delete", class: "delete-button" });

    taskItem.append(checkbox).append(textSpan).append(delButton);

    taskItem.on("click", function (event) {
      if (event.target !== delButton && event.target !== checkbox) {
        searchToDatabase(taskId);
      }
    });

    checkbox.on("click", function () {
      transferToCompleted(taskId, textSpan.text());
    });

    delButton.on("click", function (event) {
      event.stopPropagation();
      if (confirm("Are you sure you want to delete this item?")) {
        deleteToDatabase(taskId, textSpan.text());
        alert("Item deleted.");
      }
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

    checkbox.on("click", function () {
      transferToOngoing(taskId, textSpan.text());
    });

    delButton.on("click", function (event) {
      event.stopPropagation();
      if (confirm("Are you sure you want to delete this item?")) {
        deleteToDatabase(taskId, textSpan.text());
        alert("Item deleted.");
      }
    });

    $("#completedList-holder").append(taskItem);
  }

  $("#details-form").on("submit", function (event) {
    event.preventDefault();
    const taskTitle = $("#title").val();
    const taskDescription = $("#description").val();
    const due_date = $("#due_date").val();
    const taskId = $("#task-id").val();

    if (taskId && confirm("Are you sure you want to update this task?")) {
      updateInDatabase(taskId, taskTitle, taskDescription, due_date);
    } else if (taskId) {
      clearTaskDetails();
    } else {
      addToDatabase(taskTitle, taskDescription, due_date);
    }
  });

  function addToDatabase(taskTitle, taskDescription, due_date) {
    $.ajax({
      url: "others/addTask-db.php",
      method: "POST",
      data: { title: taskTitle, description: taskDescription, date: due_date },
      success: function () {
        loadOngoingTasks();
        loadCompletedTasks();
        clearTaskDetails();
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function updateInDatabase(taskId, taskTitle, taskDescription, due_date) {
    $.ajax({
      url: "others/updateTask-db.php",
      method: "POST",
      data: {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        date: due_date,
      },
      success: function () {
        loadOngoingTasks();
        loadCompletedTasks();
        clearTaskDetails();
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function deleteToDatabase(taskId, taskTitle) {
    $.ajax({
      url: "others/deleteTask-db.php",
      method: "POST",
      data: {
        id: taskId,
        title: taskTitle,
      },
      success: function () {
        loadOngoingTasks();
        loadCompletedTasks();
        clearTaskDetails();
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function searchToDatabase(taskId) {
    $.ajax({
      url: "others/searchTask-db.php",
      method: "POST",
      data: { id: taskId },
      success: function (data) {
        const row = JSON.parse(data);
        displayTaskDetails(row);
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
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
    $("#task-id").val(row.id);
  }

  $(document).on("mousedown", function (event) {
    $components =
      $("#title").is(event.target) ||
      $("#description").is(event.target) ||
      $("#delete-button").is(event.target) ||
      $("#due_date").is(event.target) ||
      $("#save-button").is(event.target) ||
      $("#list-form").is(event.target) ||
      $("#details-form").is(event.target);
    if (!$components) {
      clearTaskDetails();
    }
  });

  function clearTaskDetails() {
    $("#title").val("");
    $("#description").val("");
    $("#due_date").val("");
    $("#task-id").val("");
  }

  function transferToCompleted(taskId, taskTitle) {
    $.ajax({
      url: "others/transferToCompleted.php",
      method: "POST",
      data: {
        id: taskId,
        title: taskTitle,
      },
      success: function () {
        loadOngoingTasks();
        loadCompletedTasks();
        clearTaskDetails();
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }

  function transferToOngoing(taskId, taskTitle) {
    $.ajax({
      url: "others/transferToOngoing.php",
      method: "POST",
      data: {
        id: taskId,
        title: taskTitle,
      },
      success: function () {
        loadOngoingTasks();
        loadCompletedTasks();
        clearTaskDetails();
      },
      error: function (status, error) {
        console.error("Error fetching tasks:", status, error);
      },
    });
  }
});
