import { useState } from "react";
import data from "../../data/tasks";
import ActionBar from "../components/ActionBar";
import Form from "../components/Form";
import NotFoundTask from "../components/NotFoundTask";
import Search from "../components/Search";
import TaskRow from "../components/TaskRow";

export default function TaskView() {
  const [tasks, setTasks] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);

  function handleSaveTask(newTask, isAdd) {
    console.log(newTask, isAdd);

    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    handleCloseClick();
  }

  function handleEditTask(task) {
    setFormData(task);
    setShowModal(true);
  }

  function handleDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isFavorite: !task.isFavorite };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function handleCloseClick() {
    setShowModal(false);
    setFormData(null);
  }

  return (
    <>
      {showModal && (
        <Form
          onSave={handleSaveTask}
          onCloseClick={handleCloseClick}
          formData={formData}
        />
      )}

      <section className="mb-20" id="tasks">
        <div className="container">
          <Search />

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <ActionBar
              onAddClick={() => setShowModal(true)}
              onDeleteAll={handleDeleteAllClick}
            />
            <div className="overflow-auto">
              <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                  <tr>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                      Title
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                      Description
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                      Tags
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      Priority
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      onFavorite={() => handleFavorite(task.id)}
                      onDelete={() => handleDelete(task.id)}
                      onEdit={handleEditTask}
                    />
                  ))}
                  {!tasks.length && <NotFoundTask />}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
