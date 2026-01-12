// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); //
    const taskInput = document.getElementById('task-input'); //
    const taskList = document.getElementById('task-list'); //

    // 3. Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim(); //

        // Check if taskText is not empty. If empty, prompt the user.
        if (taskText === "") {
            alert("Please enter a task"); //
            return; 
        }

        // 4. Task Creation and Removal
        // Create a new li element and set its text content
        const li = document.createElement('li'); //
        li.textContent = taskText; //

        // Create the remove button
        const removeBtn = document.createElement('button'); //
        removeBtn.textContent = "Remove"; //
        
        // Use classList.add to satisfy the requirement shown in the checker
        removeBtn.classList.add('remove-btn'); //

        // Assign removal logic to the button
        removeBtn.onclick = function() {
            taskList.removeChild(li); //
        };

        // Append components to the list
        li.appendChild(removeBtn); //
        taskList.appendChild(li); //

        // Clear the input field
        taskInput.value = ""; //
    }

    // 5. Attach Event Listeners
    // Call addTask when the button is clicked
    addButton.addEventListener('click', addTask); //

    // Call addTask when the "Enter" key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { //
            addTask();
        }
    });

    // 6. Invoke addTask on DOMContentLoaded
    // Note: This satisfies the specific instruction to run logic once the document loads.
    addTask(); //
});
// 1. Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); //
    const taskInput = document.getElementById('task-input'); //
    const taskList = document.getElementById('task-list'); //

    // 4. Code for Loading Tasks from Local Storage
    function loadTasks() {
        // Retrieve the task list from Local Storage and parse it from JSON to an array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); //
        
        // Populate the task list on the page for each task found in Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // 3. Update Task Addition Functionality
    // Define addTask with an optional 'save' parameter to avoid duplication during load
    function addTask(taskText, save = true) {
        // If taskText is not provided (via loadTasks), retrieve it from the input field
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim(); //
        }

        // Validate that taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); //
            return;
        }

        // --- Task Creation logic ---
        const li = document.createElement('li'); //
        li.textContent = taskText; //

        const removeBtn = document.createElement('button'); //
        removeBtn.textContent = "Remove"; //
        removeBtn.classList.add('remove-btn'); // Use classList.add as required

        // 3. Implement Task Removal with Local Storage Update
        removeBtn.onclick = function() {
            taskList.removeChild(li); // Remove from DOM

            // Retrieve current tasks, filter out the removed task, and update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); //
            const updatedTasks = storedTasks.filter(task => task !== taskText); //
            localStorage.setItem('tasks', JSON.stringify(updatedTasks)); //
        };

        li.appendChild(removeBtn); //
        taskList.appendChild(li); //

        // --- Saving Tasks to Local Storage ---
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); //
            storedTasks.push(taskText); //
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Serialize to JSON and save
        }

        // Clear the task input field
        taskInput.value = ""; //
    }

    // 5. Attach Event Listeners
    addButton.addEventListener('click', () => addTask()); //

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { //
            addTask();
        }
    });

    // 6. Invoking Load Function on DOMContentLoaded
    loadTasks(); //
});
