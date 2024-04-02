import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"

function App() {
  const [tasks, setTasks] = useState([])
  const TODO_LOCAL_KEY = 'todo:Svedtask';

  function setTasksAndSave(newTask) {
    setTasks(newTask);
    localStorage.setItem(TODO_LOCAL_KEY, JSON.stringify(newTask))
  }

  function loadSavedTask() {
    const saved = localStorage.getItem(TODO_LOCAL_KEY);
    if(saved){
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadSavedTask();
  }, [])

  function addTask(tasktTitle) {

    setTasksAndSave([
       {
        id: crypto.randomUUID(),
        title: tasktTitle,
        isComplete: false,
        isEdit:false
      },...tasks
    ]);
  }

  function toggleTaskCompleteById(taskid) {
    const newTask = tasks.map(task => {
      if (task.id == taskid)
      {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }
      return task;
    })
    setTasksAndSave(newTask);
  }

  function editTaskById(taskid , editedTitle){
    const newTask = tasks.map(task=>{
      if(task.id == taskid){
        return{
          ...task,
          isEdit: !task.isEdit,
          title:editedTitle
        }
      }
      return task;
    })
    setTasksAndSave(newTask)
  }

  function deleteTaskById(taskId) {
    const newTask = tasks.filter(task => task.id !== taskId)
    setTasksAndSave(newTask)
  }

  return (
    <>
      <Header onAddTask={addTask} />

      <Tasks tasks={tasks}
        onComplete={toggleTaskCompleteById}
        onDelete={deleteTaskById}
        onEdit={editTaskById}
      />
    </>
  )
}

export default App
