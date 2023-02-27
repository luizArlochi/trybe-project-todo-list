const buttonCreateTask = document.getElementById('criar-tarefa');
const textArea = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');

buttonCreateTask.addEventListener('click', () => {
  const textTask = textArea.value;

  if (textTask !== '') {
    const newTask = document.createElement('li');
    newTask.innerText = textTask;
    taskList.appendChild(newTask);
    textArea.value = '';
  }
});
