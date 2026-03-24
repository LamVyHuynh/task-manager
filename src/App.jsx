import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  // Lấy dữ liệu nhập từ input
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  // Thêm task công việc mới
  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(), // Sử dụng timestamp làm ID duy nhất
      title: newTaskTitle,
      status: "TODO",
      deadline: "2026-12-31",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle(""); // reset input sau khi thêm công việc
  };

  // Xoá công việc
  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Sửa công việc
  // Hiển thị form sửa công việc
  const handleOpenPromptUpdateTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      const newTitle = prompt("Sửa công việc mới: ", taskToEdit.title);
      if (newTitle !== null && newTitle.trim() !== "") {
        const updateTask = tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        );
        setTasks(updateTask);
      }
    }
  };
  return (
    <div>
      <h1>Trang Quản Lý Công Việc</h1>
      <div>
        <input
          placeholder="Nhập công việc vào"
          onChange={handleInputChange}
          value={newTaskTitle}
        ></input>
        <button onClick={handleAddTask}>Thêm Công Việc</button>
      </div>
      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>Trạng thái: {task.status}</p>
          <p>Deadline: {task.deadline}</p>
          <div>
            <button onClick={() => handleDeleteTask(task.id)}>
              Xoá công việc
            </button>
            <button onClick={() => handleOpenPromptUpdateTask(task.id)}>
              Sửa công việc
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
