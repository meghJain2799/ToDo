import React, { useState, useEffect } from "react";

// Values from local Storage
const dataFromLS = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const date1 = new Date();
const date2 = new Date('02/17/2022');
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

const TODO = () => {
  // Main array of tasks
  const [tasks, setTasks] = useState(dataFromLS());
 
  // input collection
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  // handleTasks
  const handleTasks = (e) => {
    e.preventDefault();
    let task = {
      title,
      desc,
      date,
      completed: false
    };
    setTasks([...tasks, task]);
    setTitle("");
    setDesc("");
    setDate("");
    let currentDay = new Date();
    console.log(currentDay);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const deleteTask = (i) => {
    const filteredTasks = tasks.filter((element, index) => {
      return index !== i;
    });
    setTasks(filteredTasks);
  };

  const toggleComplete = (i) => {
      const updatedTasks = tasks.map((ele, index) => {
        if(index == i){
          ele.completed = !ele.completed
        }
        return ele
      })

      setTasks(updatedTasks);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="todoContainer">
            <div className="todo_adder my-3">
              <form>
                <h2 className="subhead"> My To Do list</h2>
                <input
                  className="inputs my-3"
                  type="text"
                  placeholder="Enter Your task"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <textarea
                  className="inputs mt-3 mb-1"
                  rows="3"
                  placeholder="Description of task"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
                <label>Due date:</label>
                <input
                  type="date"
                  className="inputs mt-1"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
                <div className="button_con mt-2">
                  <button className="add_button" onClick={handleTasks}>
                    {" "}
                    Add{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          {tasks.length > 0 && (
            <>
              <div className="list_container">
                {tasks.map((ele, i) => {
                  return (
                    <div className="list_box p-2 m-2" key={i}>
                      <div className="d-flex justify-content-center align-items-center mx-2">
                        <button className="check_box">
                          <input type="checkbox"
                           checked={ele.completed}
                           onChange={() => toggleComplete(i)} />
                        </button>
                      </div>
                      <div className="task_item px-2">
                        <dt style={{ textDecoration : ele.completed == true ? "line-through":"none" }}> {ele.title}</dt>
                        <dl style={{ textDecoration : ele.completed == true ? "line-through":"none" }}>{ele.desc}</dl>
                        <p style={{ textDecoration : ele.completed == true ? "line-through":"none" }}>{ele.date} </p>
                      </div>
                      <div className="deletebtn_con mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTask(i)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {tasks.length < 1 && <div> No Tasks added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default TODO;
