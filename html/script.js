// ==================== TASK MANAGEMENT ==================== 

let tasks = [];
let currentEditingId = null;
let currentFilter = 'semua';

// ==================== LOAD DATA ==================== 
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    renderTasks();
    updateStats();
});

// ==================== LOAD FROM LOCAL STORAGE ==================== 
function loadTasks() {
    const savedTasks = localStorage.getItem('agamaTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// ==================== SAVE TO LOCAL STORAGE ==================== 
function saveTasks() {
    localStorage.setItem('agamaTasks', JSON.stringify(tasks));
}

// ==================== ADD TASK ==================== 
function addTask() {
    const taskInput = document.getElementById('taskInput');
    
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Silakan masukkan deskripsi topik!');
        return;
    }

    const newTask = {
        id: Date.now(),
        description: taskText,
        category: 'Agama',
        completed: false,
        createdAt: new Date().toLocaleDateString('id-ID')
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    updateStats();

    // Clear inputs
    taskInput.value = '';
    taskInput.focus();
}

// ==================== HANDLE ENTER KEY ==================== 
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// ==================== RENDER TASKS ==================== 
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
    taskList.innerHTML = '';

    let filteredTasks = tasks;

    if (currentFilter === 'aktif') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'selesai') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    } else {
        emptyState.classList.remove('show');
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-info">
                <div class="task-description">${escapeHtml(task.description)}</div>
                <span class="task-agama">${task.category}</span>
            </div>
            <div class="task-actions">
                <button class="task-btn task-btn-check" onclick="toggleTask(${task.id})" title="Tandai Selesai">
                    ${task.completed ? '✓ Selesai' : '○ Aktif'}
                </button>
                <button class="task-btn task-btn-edit" onclick="openEditModal(${task.id})" title="Edit">
                    ✎ Edit
                </button>
                <button class="task-btn task-btn-delete" onclick="deleteTask(${task.id})" title="Hapus">
                    🗑 Hapus
                </button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

// ==================== TOGGLE TASK COMPLETION ==================== 
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ==================== DELETE TASK ==================== 
function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// ==================== OPEN EDIT MODAL ==================== 
function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    currentEditingId = id;
    document.getElementById('editTaskInput').value = task.description;
    document.getElementById('editCategorySelect').value = task.category;

    const modal = document.getElementById('editModal');
    modal.classList.add('show');
}

// ==================== CLOSE MODAL ==================== 
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
    currentEditingId = null;
}

// ==================== SAVE EDIT ==================== 
function saveEdit() {
    const editTaskInput = document.getElementById('editTaskInput');

    const updatedDescription = editTaskInput.value.trim();

    if (updatedDescription === '') {
        alert('Silakan masukkan deskripsi topik!');
        return;
    }

    const task = tasks.find(t => t.id === currentEditingId);
    if (task) {
        task.description = updatedDescription;
        saveTasks();
        renderTasks();
        updateStats();
        closeModal();
    }
}

// ==================== FILTER TASKS ==================== 
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderTasks();
}

// ==================== UPDATE STATISTICS ==================== 
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
}

// ==================== ESCAPE KEY & MODAL ==================== 
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ==================== UTILITY FUNCTIONS ==================== 
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}