import { useState, useEffect } from "react"



function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinish, setShowFinish] = useState(false)

  function saveToLS() {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  function getFromLS() {

    let get = localStorage.getItem("todos")
    if (get != null) {
      let to = JSON.parse(get)
      setTodos(to)

    }
  }
  useEffect(() => {
    getFromLS()


  }, [])


  function handleAdd() {
    let todoToAdd = { content: todo, isCompleted: false }
    setTodos([...todos, todoToAdd])
    setTodo("")
    saveToLS()
  }

  function handleEdit(element, index) {
    let obtainTodo = todos.filter((el, i) => {
      return i == index;
    })

    setTodo(obtainTodo[0].content)
    let newTodos = todos.filter((td, i) => {
      return i != index
    })
    setTodos(newTodos)
    saveToLS()

  }
  function handleDelete(element, index) {
    let newTodos = todos.filter((td, i) => {
      return i != index
    })
    setTodos(newTodos)
    saveToLS()

  }

  function handleCheckboxTodo(e, i) {
    let newTodos = [...todos]
    todos[i].isCompleted = !todos[i].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  function handleFinish(element) {
    setShowFinish(!showFinish)
  }

  return (
    <>
      <div className="container flex flex-col w-full h-screen bg-slate-950 ">
        <nav className="w-full bg-blue-800 text-white flex justify-between items-center">
          <div className="logo font-bold m-2 text-2xl">Ido</div>
          <div className="m-2 font-medium">Tasks</div>
        </nav>
        <div className="todo-app w-[60%] min-h-[30%] mx-auto bg-blue-600 p-6 py-2 pb-6 rounded-sm">
          <div className="flex items-center
          ">
            <div className="logo font-bold m-2 text-xl">Ido |</div><span className="text-sm">Manage your Tasks</span>
          </div>
          <div className="add-section flex  gap-[10px] items-center">
            <input value={todo} onChange={(e) => { setTodo(e.target.value) }} className="rounded-md px-2 py-1 w-[50%]" type="text" placeholder="Enter your text" />
            <button className="save-btn rounded-md px-2 py-1 bg-purple-700 text-white hover:bg-purple-800" onClick={handleAdd}>save</button>
          </div>
          <h2 className="font-bold text-xl">Todos</h2>
          <div className="flex items-center">
            <input checked={showFinish} type="checkbox" name="showFinished" onChange={handleFinish} />
            <span className="ml-1 m-2">Show Finished</span>
          </div>
          <div className="todos flex flex-col gap-2">

            {showFinish ? todos.map((td, i) => {
              return <div key={i} className="todo p-1  border border-black flex items-center w-[70%] justify-between">
                <input checked={td.isCompleted} onChange={(e) => { handleCheckboxTodo(e, i) }} type="checkbox" name="finish-check" id="" />
                <span className={`${td.isCompleted ? "line-through" : ""} max-w-[200px]`}>{td.content}</span> <div className="buttons">
                  <button className="edit-btn rounded-md px-2 py-1 mr-2 bg-purple-700 text-white hover:bg-purple-800" onClick={(e) => { handleEdit(e, i) }}>edit</button>
                  <button className="delete-btn rounded-md px-2 py-1 bg-purple-700 text-white hover:bg-purple-800" onClick={(e) => { handleDelete(e, i) }}>delete</button>
                </div>
              </div>

            }) : todos.map((td, i) => {
              return td.isCompleted == false && <div key={i} className="todo p-1 border border-black flex items-center  w-[70%] justify-between">
                <input checked={td.isCompleted} onChange={(e) => { handleCheckboxTodo(e, i) }} type="checkbox" name="finish-check" id="" />
                <span className={`${td.isCompleted ? "line-through" : ""} max-w-[200px]`}>{td.content}</span> <div className="buttons">
                  <button className="edit-btn rounded-md px-2 py-1 mr-2 bg-purple-700  text-white hover:bg-purple-800" onClick={(e) => { handleEdit(e, i) }}>edit</button>
                  <button className="delete-btn rounded-md px-2 py-1 bg-purple-700  text-white hover:bg-purple-800" onClick={(e) => { handleDelete(e, i) }}>delete</button>
                </div>
              </div>

            })}

          </div>
        </div>
      </div>

    </>
  )
}

export default App
