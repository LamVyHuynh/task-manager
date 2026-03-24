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
      alert("Vui lòng nhập công việc vào:");
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
          <button onClick={() => handleDeleteTask(task.id)}>
            Xoá công việc
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
