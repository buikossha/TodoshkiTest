import { useState } from "react"
import style from './TodoForm.module.scss'

function TodoForm({ addTodo }) {

  const [newTodo, setNewTodo] = useState('')

  const addTodoHandler = () => {
    if (newTodo) {
      addTodo(newTodo);
    }
    setNewTodo('')
  }
  return (
    <form className={style.form} type="submit" onSubmit={(e) => e.preventDefault()}>
      <input placeholder="NEW TODO" className={style.form__input} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text" />
      <button className={style.form__button} onClick={() => addTodoHandler()}>add todo</button>
    </form>
  )
}

export default TodoForm
