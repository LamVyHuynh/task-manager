import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("TODO");
  const [editDeadline, setEditDeadline] = useState("");
  const [status, setStatus] = useState("ALL");
  const [searchItem, setSearchItem] = useState("");

  const handleDeadlineChange = (e) => {
    setNewTaskDeadline(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "" || newTaskDeadline.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      status: "TODO",
      deadline: newTaskDeadline,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDeadline("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleStartEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditStatus(task.status);
    setEditDeadline(task.deadline);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditStatus("TODO");
    setEditDeadline("");
  };

  const handleUpdateTask = (id) => {
    if (editTitle.trim() === "" || editDeadline.trim() === "") {
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: editTitle.trim(),
            status: editStatus,
            deadline: editDeadline,
          }
        : task
    );

    setTasks(updatedTasks);
    handleCancelEdit();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = status === "ALL" || task.status === status;
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    return matchStatus && matchSearch;
  });

  const isOverdue = (deadline) => {
    if (!deadline) return false;

    const today = new Date();
    const taskDeadline = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    taskDeadline.setHours(0, 0, 0, 0);

    return taskDeadline < today;
  };

  const isDueSoon = (deadline) => {
    if (!deadline) return false;

    const today = new Date();
    const taskDeadline = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    taskDeadline.setHours(0, 0, 0, 0);

    const timeDiff = taskDeadline - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    return daysDiff >= 0 && daysDiff <= 3;
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return "Chua dat deadline";

    return new Date(deadline).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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

  const getStatusClasses = (taskStatus) => {
    if (taskStatus === "DONE") {
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    }

    if (taskStatus === "In Proccess") {
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";
    }

    return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <main className="px-4 py-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-2 px-1">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
              Single Page Application
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Quản lý công việc cá nhân
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              Theo dõi tiến độ, kiểm soát deadline và cập nhật trạng thái công
              việc trong một màn hình duy nhất.
            </p>
          </div>

          <section className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-5">
              <p className="text-sm text-slate-500">Tổng số task</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {totalTasks}
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-5">
              <p className="text-sm text-slate-500">Đã hoàn thành</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-600 sm:text-4xl">
                {completedTasks}
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-5">
              <p className="text-sm text-slate-500">Quá hạn</p>
              <p className="mt-3 text-3xl font-semibold text-rose-600 sm:text-4xl">
                {overdueTasks}
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-5">
              <p className="text-sm text-slate-500">Sắp đến hạn</p>
              <p className="mt-3 text-3xl font-semibold text-amber-500 sm:text-4xl">
                {dueSoonTasks}
              </p>
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[390px_minmax(0,1fr)]">
            <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
              <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-6">
                <div className="mb-5 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Tạo task
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Tạo mới công việc
                  </h2>
                </div>

                <div className="space-y-4">
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                    placeholder="Nhập tên công việc"
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    value={newTaskTitle}
                  />
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                    type="date"
                    value={newTaskDeadline}
                    onChange={handleDeadlineChange}
                  />
                  <button
                    className="w-full rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:py-3"
                    onClick={handleAddTask}
                  >
                    Tạo mới task
                  </button>
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-6">
                <div className="mb-5 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Tìm kiếm và lọc
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Điều hướng danh sách
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                    placeholder="Tìm kiếm công việc"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="TODO">TODO</option>
                    <option value="In Proccess">In Proccess</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col gap-3 rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:rounded-[28px] sm:p-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Khu vực công việc
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Danh sách công việc hiện tại
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  Hiển thị {filteredTasks.length} / {totalTasks} task
                </p>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="grid gap-5 2xl:grid-cols-2">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`rounded-[24px] p-4 shadow-sm ring-1 transition sm:rounded-[28px] sm:p-5 ${
                        task.status === "DONE"
                          ? "bg-slate-100/80 ring-slate-200"
                          : "bg-white ring-slate-200 hover:ring-slate-300"
                      }`}
                    >
                      <div className="flex flex-col gap-5">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                              {formatDeadline(task.deadline)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
                              {task.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                              Theo dõi deadline và cập nhật tiến độ ngay trên
                              card này để tránh bỏ sót công việc.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {isOverdue(task.deadline) &&
                            task.status !== "DONE" && (
                              <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
                                Công việc đã quá hạn!
                              </p>
                            )}

                          {!isOverdue(task.deadline) &&
                            isDueSoon(task.deadline) &&
                            task.status !== "DONE" && (
                              <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-medium text-amber-600">
                                Cảnh báo: Công việc sắp đến hạn!
                              </p>
                            )}

                          {task.status === "DONE" && (
                            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
                              Công việc đã hoàn thành!
                            </p>
                          )}
                        </div>

                        {editingTaskId === task.id ? (
                          <div className="space-y-4 rounded-[24px] bg-slate-50 p-4 ring-1 ring-slate-200">
                            <input
                              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                              <select
                                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                              >
                                <option value="TODO">TODO</option>
                                <option value="In Proccess">In Proccess</option>
                                <option value="DONE">DONE</option>
                              </select>
                              <input
                                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:px-4 sm:py-3"
                                type="date"
                                value={editDeadline}
                                onChange={(e) =>
                                  setEditDeadline(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <button
                                className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:py-3"
                                onClick={() => handleUpdateTask(task.id)}
                              >
                                Lưu thay đổi
                              </button>
                              <button
                                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 sm:py-3"
                                onClick={handleCancelEdit}
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                            <button
                              className="rounded-2xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-100"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Xóa
                            </button>
                            <button
                              className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:py-3"
                              onClick={() => handleStartEditTask(task)}
                            >
                              Sửa công việc
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[28px] bg-white px-6 py-14 text-center shadow-sm ring-1 ring-slate-200 sm:rounded-[32px] sm:px-8 sm:py-16">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                    Trạng thái rỗng
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                    Không tìm thấy kết quả phù hợp
                  </h3>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                    Thử đổi từ khóa tìm kiếm, đổi bộ lọc trạng thái hoặc tạo một
                    task mới để bắt đầu quy trình làm việc của bạn.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
