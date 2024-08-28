import { useNavigate } from "react-router-dom"
import { createToDoPost } from "../../services/todo-post"
import ToDoPostForm from "../../components/ToDoPostForm/ToDoPostForm"
import { ToDoPostFormData } from "../../components/ToDoPostForm/schema"


const CreateToDoPostPage = () => {
 const navigate = useNavigate()

  const onSubmit = async(data: ToDoPostFormData) => {
    createToDoPost(data)
      .then(()=>navigate('/'))
      .catch(e=>console.log(e))
  }

  return (
    <>
      <h1>Add Your To Do List</h1>
      <ToDoPostForm  onSubmit={onSubmit} formType='create'/>
    </>
  )
}

export default CreateToDoPostPage