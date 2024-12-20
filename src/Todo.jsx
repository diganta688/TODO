import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoShow from "./TodoShow";
import TextField from "@mui/material/TextField";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import "./Todo.css";

export default function Todo() {
  let [tasks, setTasks] = useState([]);
  let [newTask, setNewTask] = useState("");
  useEffect(()=>{
    let todo = localStorage.getItem("tasks");
    if(todo){
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);

  const saveToLs = (params)=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const handleSubmit = () => {
    setTasks((t) => {
      return [...t, { task: newTask, id: uuidv4(), isDone: false }];
    });
    setNewTask("");
    saveToLs();
  };
  const onInputChange = (e) => {
    setNewTask(e.target.value);
    saveToLs();
  };

  return (
    <div className="main">
      <div className="container">
        <div className="todoSearch">
          <div className="heading">
            <div className="headingText">
              <h1>TO-DO List</h1>
            </div>
            <div className="headingIcon">
              <FormatListNumberedIcon />
            </div>
          </div>
          <div className="inputAndButton">
            <TextField
              id="outlined-basic"
              label="Add your task"
              variant="outlined"
              value={newTask}
              onChange={onInputChange}
            />
            <button className="addTask" onClick={handleSubmit}>
              ADD
            </button>
          </div>
        </div>
        <TodoShow tasks={tasks} setTasks={setTasks} saveToLs={saveToLs} />
      </div>
    </div>
  );
}
