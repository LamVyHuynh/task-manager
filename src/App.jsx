import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Lấy dữ liệu nhập từ input
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };
  // Nhập deadline cho công việc mới
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const handleDeadlineChange = (e) => {
    setNewTaskDeadline(e.target.value);
  };

  // Thêm task công việc mới
  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDeadline.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(), // Sử dụng timestamp làm ID duy nhất
      title: newTaskTitle.trim(),
      status: "TODO",
      deadline: newTaskDeadline,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle(""); // reset input sau khi thêm công việc
    setNewTaskDeadline(""); // reset input sau khi thêm công việc
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
            title: editTitle.trim(),
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

  // Tìm kiếm công việc
  const [searchItem, setSearchItem] = useState("");
  // Lọc công việc theo trạng thái
  const filteredTasks = tasks.filter((task) => {
    const matchStatus = status === "ALL" || task.status === status;
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Cảnh báo quá hạn deadline của công việc
  const isOverdue = (deadline) => {
    if (!deadline) return false; // Nếu không có deadline, không xem là quá hạn
    const today = new Date();
    const taskDeadline = new Date(deadline);

    // Set thời gian về 0:0 để chỉ còn so sánh ngày với nhau mà thoi
    today.setHours(0, 0, 0, 0);
    taskDeadline.setHours(0, 0, 0, 0);

    return taskDeadline < today;
  };

  // Cảnh báo sắp đến thời gian deadline của công việc
  const isDueSoon = (deadline) => {
    if (!deadline) return false; // Nếu không có deadline, không cần cảnh báo
    const today = new Date();
    const taskDeadline = new Date(deadline);

    // Set thời gian về 0:0 để chỉ còn so sánh ngày với nhau mà thôi
    today.setHours(0, 0, 0, 0);
    taskDeadline.setHours(0, 0, 0, 0);

    const timeDiff = taskDeadline - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    return daysDiff >= 0 && daysDiff <= 3; // Cảnh báo nếu deadline trong vòng 3 ngày tới
  };

  // Thống kê số lượng task, số task hoàn thành, số task quá hạn, số task sắp đến hạn
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "DONE").length;
  const overdueTasks = tasks.filter(
    (task) => isOverdue(task.deadline) && task.status !== "DONE"
  ).length;
  const dueSoonTasks = tasks.filter(
    (task) =>
      !isOverdue(task.deadline) &&
      isDueSoon(task.deadline) &&
      task.status !== "DONE"
  ).length;

  return (
    <div>
      <h1>Trang Quản Lý Công Việc</h1>
      <div>
        <p>Tổng số công việc: {totalTasks}</p>
        <p>Số công việc đã hoàn thành: {completedTasks}</p>
        <p>Số công việc quá hạn: {overdueTasks}</p>
        <p>Số công việc sắp đến hạn: {dueSoonTasks}</p>
      </div>
      <div>
        <input
          placeholder="Nhập công việc vào"
          onChange={handleInputChange}
          value={newTaskTitle}
        ></input>
        <input
          type="date"
          value={newTaskDeadline}
          onChange={handleDeadlineChange}
        ></input>
        <button onClick={handleAddTask}>Thêm Công Việc</button>
      </div>
      {/* Tìm kiếm công việc */}
      <input
        placeholder="Công việc cần tìm"
        onChange={(e) => setSearchItem(e.target.value)}
      ></input>
      {/* Lọc trạng thái công việc */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="ALL">TẤT CẢ</option>
        <option value="TODO">TODO</option>
        <option value="In Proccess">In Proccess</option>
        <option value="DONE">DONE</option>
      </select>

      <hr />
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>Trạng thái: {task.status}</p>
            <p>Deadline: {task.deadline}</p>
            {/* Thông báo quá hạn */}
            {isOverdue(task.deadline) && task.status !== "DONE" && (
              <p style={{ color: "red" }}>Công việc đã quá hạn!</p>
            )}

            {/*  Cảnh báo sắp đến hạn */}
            {!isOverdue(task.deadline) &&
              isDueSoon(task.deadline) &&
              task.status !== "DONE" && (
                <p style={{ color: "orange" }}>
                  Cảnh báo: Công việc sắp đến hạn!
                </p>
              )}

            {/* Đánh dâu công việc hoàn thành */}
            {task.status === "DONE" && (
              <p style={{ color: "green" }}>Công việc đã hoàn thành!</p>
            )}
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
                    <option value="In Proccess">In Proccess</option>
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
        ))
      ) : (
        <p>Không có công việc nào phù hợp với tiêu chí tìm kiếm.</p>
      )}
    </div>
  );
}

export default App;
