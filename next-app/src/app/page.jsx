'use client'
import { useEffect, useState } from "react"
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import style from './page.module.scss'

function Todos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    setTodos(data)
  };

  useEffect(() => {
    getTodos();
  }, [])

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      status: false
    }

    if (title) {
      fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      })
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'delete',
    })
    setTodos(todos.filter((el) => el.id !== id));
  }

  const changeTodoStatus = (id, status) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "status": !status
      })
    })
    const copy = [...todos];
    const current = copy.find((el) => el.id === id)
    current.status = !current.status;
    setTodos(copy)
  }

  const [searchParam, setSearchParam] = useState('');

  const filteredTodos = todos.filter((el) => {
    return el.title.toLowerCase().includes(searchParam)
  })

  return (
    <div className={style.container}>
      <TodoForm addTodo={addTodo} />
      <input className={style.search__input} value={searchParam} onChange={(e) => setSearchParam(e.target.value)} type="text" placeholder="SEARCH TODO" />
      <h3 className={style.title}>todos</h3>
      <div className={style.todos__wrapper}>
        {filteredTodos?.map((todo) => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} changeTodoStatus={changeTodoStatus} />)}
      </div>
    </div>
  )
}

export default Todos
