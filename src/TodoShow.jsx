// Import
import Checkbox from "@mui/material/Checkbox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function TodoShow({ tasks, setTasks, saveToLs }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [editingTaskId, setEditingTaskId] = useState(null);

  const deleteTodo = (id) => {
    setTasks((t) => t.filter((task) => task.id !== id));
    saveToLs();
  };

  const isDoneHandle = (id) => {
    setTasks((s) =>
      s.map((t) => {
        if (t.id === id) {
          return { ...t, isDone: !t.isDone };
        } else {
          return t;
        }
      })
    );
    saveToLs();
  };

  const editTask = (id) => {
    setEditingTaskId(id);
    saveToLs();
  };

  const saveEditedTask = (id, updatedTask) => {
    setTasks((t) =>
      t.map((task) => {
        if (task.id === id) {
          return { ...task, task: updatedTask };
        }
        return task;
      })
    );
    setEditingTaskId(null);
    saveToLs();
  };

  return (
    <div className="todoShowMain">
      <div className="todoHeading">
        <h1>Today's all Tasks</h1>
      </div>
      <div className="allTasks">
        {tasks.map((t) => {
          return (
            <div key={t.id} className="TodoShowSub">
              <div className="taskAndCheckbox">
                <span onClick={() => isDoneHandle(t.id)}>
                  <Checkbox {...label} checked={t.isDone} color="secondary" />
                </span>
                <span>
                  {editingTaskId === t.id ? (
                    <input
                      type="text"
                      defaultValue={t.task}
                      onBlur={(e) => saveEditedTask(t.id, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <p
                      style={
                        t.isDone
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                    >
                      {t.task}
                    </p>
                  )}
                </span>
              </div>
              <div className="deleteTask">
                <span style={{ marginRight: "0.5rem" }}>
                  <EditIcon onClick={() => editTask(t.id)} />
                </span>
                <span>
                  <DeleteForeverIcon onClick={() => deleteTodo(t.id)} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
