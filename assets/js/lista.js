const tasks = [];
let editIndex = -1;

function send() {
    const taskInput = document.getElementById('typeTask');
    const texto = taskInput.value.trim();

    if (texto !== '') {
        if (editIndex !== -1) {
            tasks[editIndex].text = texto;
            editIndex = -1;
        } else {
            tasks.push({ text: texto, completed: false, id: genereteId()});
        }
        updateTaskList();
        taskInput.value = '';
        
    } 
}

function updateTaskList() {
    const caixaTarefas = document.getElementById('hidden');
    caixaTarefas.innerHTML = '';

    tasks.forEach((task, index) => {
        const novaTarefa = document.createElement('div');
        novaTarefa.classList.add('task-item');
        novaTarefa.id = `task`;

        const taskText = document.createElement('p');
        taskText.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>' ;
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => completeTask(index));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editTask(index, task.text));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTask(index));

        novaTarefa.appendChild(taskText);
        novaTarefa.appendChild(completeButton);
        novaTarefa.appendChild(editButton);
        novaTarefa.appendChild(deleteButton);

        if (task.completed) {
            completeButton.style.backgroundColor = 'green';
        }

        caixaTarefas.appendChild(novaTarefa);
    });
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function editTask(index, text) {
    const taskInput = document.getElementById('typeTask');
    taskInput.value = text;
    editIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function genereteId(){
    return Math.floor(Math.random() * 10 )
 
 }