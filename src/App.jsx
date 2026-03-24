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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("TODO");
  const [editDeadline, setEditDeadline] = useState("2026-12-31");
  const [status, setStatus] = useState("ALL");

  const handleStartEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditStatus(task.status);
    setEditDeadline(task.deadline);
  };
  const handleUpdateTask = (id) => {
    const updateTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: editTitle,
            status: editStatus,
            deadline: editDeadline,
          }
        : task
    );
    setTasks(updateTask);
    setEditingTaskId(null); // Đóng form sửa công việc sau khi lưu thay đổi
    setEditTitle(""); // Reset input sau khi lưu thay đổi
    setEditStatus("TODO"); // Reset input sau khi lưu thay đổi
    setEditDeadline("2026-12-31"); // Reset input sau khi lưu thay đổi
  };

  // Lọc công việc theo trạng thái

  const filteredTasks =
    status === "ALL" ? tasks : tasks.filter((task) => task.status === status);

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
      {/* Lọc trạng thái công việc */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="ALL">TẤT CẢ</option>
        <option value="TODO">TODO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
      </select>

      <hr />

      {filteredTasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>Trạng thái: {task.status}</p>
          <p>Deadline: {task.deadline}</p>
          <div>
            <button onClick={() => handleDeleteTask(task.id)}>
              Xoá công việc
            </button>

            {editingTaskId === task.id ? (
              <div>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                ></input>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="TODO">TODO</option>
                  <option value="DOING">DOING</option>
                  <option value="DONE">DONE</option>
                </select>
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                ></input>

                <button onClick={() => handleUpdateTask(task.id)}>
                  Lưu thay đổi
                </button>
              </div>
            ) : (
              <button onClick={() => handleStartEditTask(task)}>
                Sửa công việc
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
