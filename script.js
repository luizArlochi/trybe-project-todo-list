const buttonCreateTask = document.getElementById('criar-tarefa');
const textArea = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');
const tasks = [];
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

function createTaskElement(element) {
  const newTask = document.createElement('li');
  newTask.innerText = element.task;
  newTask.addEventListener('click', () => {
    if (selectedTask !== null) {
      selectedTask.style.backgroundColor = '';
    }
    newTask.style.backgroundColor = 'gray';
    selectedTask = newTask;
  });
  newTask.addEventListener('dblclick', () => {
    element.completed = !element.completed;
    if (element.completed) {
      newTask.classList.add('completed');
    } else {
      newTask.classList.remove('completed');
    }
  });
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

function saveTaskList() {
  const tasksArray = Array.from(taskList.children).map((task) => {
    return {
      task: task.innerText,
      completed: task.classList.contains('completed'),
    };
  });

  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTaskList() {
  const tasksJSON = localStorage.getItem('tasks');

  if (tasksJSON !== null) {
    const tasksArray = JSON.parse(tasksJSON);
    tasksArray.forEach((task) => {
      const newTask = document.createElement('li');
      newTask.innerText = task.task;
      if (task.completed) {
        newTask.classList.add('completed');
      }
      taskList.appendChild(newTask);
    });
  }
}

const buttonSaveTasks = document.getElementById('salvar-tarefas');
buttonSaveTasks.addEventListener('click', () => {
  saveTaskList();
});

window.addEventListener('load', () => {
  loadTaskList();
});

document.body.appendChild(buttonSaveTasks);

const buttonMoveUp = document.getElementById('mover-cima');
const buttonMoveDown = document.getElementById('mover-baixo');

buttonMoveUp.addEventListener('click', () => {
  if (selectedTask !== null && selectedTask.previousSibling !== null) {
    const index = Array.from(taskList.children).indexOf(selectedTask);
    const previousIndex = index - 1;
    taskList.insertBefore(selectedTask, taskList.children[previousIndex]);
    tasks.splice(index, 1);
    tasks.splice(previousIndex, 0, {
      task: selectedTask.innerText,
      completed: selectedTask.classList.contains('completed'),
    });
  }
});

buttonMoveDown.addEventListener('click', () => {
  if (selectedTask !== null && selectedTask.nextSibling !== null) {
    const index = Array.from(taskList.children).indexOf(selectedTask);
    const nextIndex = index + 1;
    taskList.insertBefore(selectedTask.nextSibling, selectedTask);
    tasks.splice(index, 1);
    tasks.splice(nextIndex, 0, {
      task: selectedTask.innerText,
      completed: selectedTask.classList.contains('completed'),
    });
  }
});

document.body.appendChild(buttonMoveUp);
document.body.appendChild(buttonMoveDown);

const buttonRemoveSelected = document.getElementById('remover-selecionado');

buttonRemoveSelected.addEventListener('click', () => {
  if (selectedTask !== null) {
    const index = tasks.findIndex((task) => task.task === selectedTask.innerText);
    tasks.splice(index, 1);
    selectedTask.remove();
    selectedTask = null;
  }
});
