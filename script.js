document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const editModal = document.getElementById('edit-modal');
    const editTaskInput = document.getElementById('edit-task-input');
    const saveBtn = document.getElementById('save-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentTaskId = null;

    // Inicializar y renderizar tareas
    renderTasks();

    // Añadir tarea
    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { id: Date.now(), text: taskText };
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Renderizar tareas
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button onclick="editTask(${task.id})">✏️</button>
                    <button onclick="deleteTask(${task.id})">❌</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Editar tarea
    window.editTask = function (id) {
        currentTaskId = id;
        const task = tasks.find(t => t.id === id);
        editTaskInput.value = task.text;
        editModal.style.display = 'flex';
    };

    // Guardar tarea editada
    saveBtn.addEventListener('click', () => {
        const taskText = editTaskInput.value.trim();
        if (taskText !== '') {
            const task = tasks.find(t => t.id === currentTaskId);
            task.text = taskText;
            saveTasks();
            renderTasks();
            editModal.style.display = 'none';
        }
    });

    // Eliminar tarea
    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    // Guardar tareas en localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});
