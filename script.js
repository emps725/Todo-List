const addtask = document.getElementById("todoadd");
const addbutton = document.getElementById("addbtn");
const ul = document.getElementById("todolist");
const remaining = document.getElementById("remains");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  renderTask(task);
  updateRemaining();
});

function updateRemaining() {
  let count = 0;
  tasks.forEach((task) => {
    if (!task.completed) count++;
  });
  remaining.textContent = `Your remaining todos: ${count}`;
}

function addingTask() {
  const tasktest = addtask.value.trim(); // To remove extra spaces
  if (tasktest === "") return; // Empty entry

  const newtask = {
    id: Date.now(),
    text: tasktest,
    completed: false,
  }; // Create object with metadata (id, task itself, completion)

  tasks.push(newtask); // add to array Tasks
  saveTasks();
  updateRemaining();
  renderTask(newtask);
  addtask.value = "";
}

addtask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addingTask();
  }
});

addbutton.addEventListener("click", () => {
  addingTask();
});

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  li.className =
    "flex items-center justify-between border border-[#C5C5C5] rounded-xl px-3 py-2";

  li.innerHTML = `
  <div class="flex items-center gap-2">
    <input type="checkbox" />
    <span class="task-text">${task.text}</span>
  </div>
  <button class="hover:font-bold transition">✕</button>
  `;

  const taskDiv = li.querySelector("div");
  const checkbox = li.querySelector("input[type='checkbox']");
  const span = taskDiv.querySelector("span");

  ul.appendChild(li);
  li.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      tasks = tasks.filter((taskin) => taskin.id !== task.id);
      li.remove();
      saveTasks();
      updateRemaining();
      return;
    }
    if (e.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    span.classList.toggle("line-through", checkbox.checked);
    span.classList.toggle("text-gray-500", checkbox.checked);
    task.completed = !task.completed;
    saveTasks();
    updateRemaining();
  });

  if (task.completed) {
    checkbox.checked = !checkbox.checked;
    span.classList.toggle("line-through", checkbox.checked);
    span.classList.toggle("text-gray-500", checkbox.checked);
  }

  // checkbox.addEventListener("change", () => {
  //   span.classList.toggle("line-through", checkbox.checked);
  //   span.classList.toggle("text-gray-500", checkbox.checked);
  // });

  console.log(task.text); // remove later
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); //setItem takes only string values, so we convert tasks into json and stringify
}
