import { useNavigate } from "react-router-dom"
import { createToDoPost } from "../../services/todo-post"
import ToDoPostForm from "../../components/ToDoPostForm/ToDoPostForm"
import { ToDoPostFormData } from "../../components/ToDoPostForm/schema"

interface CreateToDoPostPageProps {
  onPostCreated: () => void
}

const CreateToDoPostPage = ({ onPostCreated }: CreateToDoPostPageProps) => {
 const navigate = useNavigate()

  const onSubmit = async(data: ToDoPostFormData) => {
    createToDoPost(data)
    .then(() => {
      onPostCreated() 
      navigate('/')
    })
    .catch(e => console.log(e))
  }

  return (
    <>

      <ToDoPostForm  onSubmit={onSubmit} formType='create'/>
    </>
  )
}

export default CreateToDoPostPage