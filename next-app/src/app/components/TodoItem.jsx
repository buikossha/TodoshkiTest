import style from './TodoItem.module.scss'

function TodoItem({ todo, deleteTodo, changeTodoStatus }) {
  return (
    <div className={style.todo__wrapper}>
      <label className={style.checkbox__wrapper}>
        <input className={style.checkbox__real} onClick={() => changeTodoStatus(todo.id, todo.status)} type="checkbox" />
        <div className={todo.status ? style.checkbox__fake__checked : style.checkbox__fake}></div>
        <p className={todo.status ? style.todo__title__checked : style.todo__title}>{todo.title}</p>
      </label>
      <button className={style.todo__button} onClick={() => deleteTodo(todo.id)}>delete</button>
    </div>
  )
}

export default TodoItem
