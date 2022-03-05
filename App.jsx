import React, { useEffect, useState } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import "./App.css";

import Header from "./components/Header"
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";

const App = ( ) => {
  const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fecthTasks = async() => {

          const {data} = await axios.get("https://jsonplaceholder.cypress.io/todos?_limit=10")
          setTasks(data);
        }
       fecthTasks(); 
    }, [])

    const handleTaskClick = (taskId) => {
      const newTasks = tasks.map((task) => {
        if( task.id == taskId ) return { ... task, completed: !task.completed}

        return task;
      });
      setTasks(newTasks)
    }

    const handleTaskAddition = (taskTitle) => {
      const newTasks = [... tasks, {
        title: taskTitle,
        id: uuidv4(),
        completed: false
      },
    ];
    setTasks(newTasks);
    }

    const handleTaskDeletion = (taskId) => {
      const newTasks = tasks.filter((task) => task.id != taskId)
      setTasks(newTasks)

    }

  return (
  <Router>
    <div className = "container">
        <Header/>
            <Route 
            path="/"
            exact
            render={() => (
              <>
              
              <AddTask handleTaskAddition={handleTaskAddition}/>
              <Tasks 
              tasks={tasks}
              handleTaskClick={handleTaskClick} 
              handleTaskDeletion={handleTaskDeletion}  
              />
              
              </>
  
            )}  />
               
    </div> 
    <Route path="/:taskTitle" exact component={TaskDetails} />
  </Router>
      
  );

};

export default App;