import { ToDoPostResponse } from "../../services/todo-post"


interface ToDoPostProps{
  post: ToDoPostResponse
  onDelete: (id:number)=>Promise<unknown>
}

const ToDoPost = ({ post ,onDelete}:ToDoPostProps) => {
  return (
    <div>
      
      <p>{post.content}</p>
      <h3>{post.category}</h3>
      <h4>{post.updatedAt}</h4>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  )
}

export default ToDoPost