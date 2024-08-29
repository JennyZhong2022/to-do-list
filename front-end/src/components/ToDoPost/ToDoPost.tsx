import { ToDoPostResponse } from "../../services/todo-post"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


interface ToDoPostProps{
  post: ToDoPostResponse
  onDelete: (id:number)=>Promise<unknown>
}

const ToDoPost = ({ post, onDelete }: ToDoPostProps) => {
  const navigate = useNavigate()

  const handleEditBtn = () => {
    navigate(`/posts/${post.id}/edit`)
  }

  return (
    <div>
      
      <p>{post.content}</p>
      <h3>{post.category}</h3>
      <h4>CreateAt:{dayjs(post.createdAt).fromNow()}</h4>
      <h4>UpdateAT:{dayjs(post.updatedAt).fromNow()}</h4>
      <button onClick={() => onDelete(post.id)}>Delete</button>
      <button onClick={handleEditBtn}>Edit</button>
    </div>
  )
}

export default ToDoPost