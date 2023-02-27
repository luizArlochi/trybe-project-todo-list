const buttonCreateTask = document.getElementById('criar-tarefa');
const textArea = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');
let tasks = [];
let selectedTask = null;

buttonCreateTask.addEventListener('click', () => {
  const textTask = textArea.value;

  if (textTask !== '') {
    const newTask = {
      task: textTask,
      completed: false,
    };
    tasks.push(newTask);
    updateTaskList();
    textArea.value = '';
  }
});

function createTaskElement(task) {
  const newTask = document.createElement('li');
  newTask.innerText = task.task;
  newTask.addEventListener('click', () => {
    if (selectedTask !== null) {
      selectedTask.style.backgroundColor = '';
    }
    newTask.style.backgroundColor = 'gray';
    selectedTask = newTask;
  });
  newTask.addEventListener('dblclick', () => {
    task.completed = !task.completed;
    updateTaskList();
  });
  if (task.completed) {
    newTask.classList.add('completed');
  }
  return newTask;
}

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const newTask = createTaskElement(task);
    taskList.appendChild(newTask);
  });
}

const buttonClearTasks = document.getElementById('apaga-tudo');

buttonClearTasks.addEventListener('click', () => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
});

function removeCompletedItems() {
  const completedItems = taskList.querySelectorAll('.completed');
  completedItems.forEach((item) => {
    item.remove();
  });
}

const buttonClearCompleteTasks = document.getElementById('remover-finalizados');
buttonClearCompleteTasks.addEventListener('click', () => {
  removeCompletedItems();
});

document.body.appendChild(buttonClearCompleteTasks);
