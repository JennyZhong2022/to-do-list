import { useNavigate } from "react-router-dom"
import { CategoryResponse, createToDoPost } from "../../services/todo-post"
import ToDoPostForm from "../../components/ToDoPostForm/ToDoPostForm"
import { ToDoPostFormData } from "../../components/ToDoPostForm/schema"

interface CreateToDoPostPageProps {
  onPostCreated: () => void
  onCategoryCreated: () => void
  categories: CategoryResponse[]
  
}

const CreateToDoPostPage = ({ onPostCreated,onCategoryCreated,categories,}: CreateToDoPostPageProps) => {
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

      <ToDoPostForm  onSubmit={onSubmit}  categories={categories} 
          onCategoryCreated={onCategoryCreated} formType='create'/>
    </>
  )
}

export default CreateToDoPostPage