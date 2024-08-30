import { useNavigate } from "react-router-dom"
import { createCategory } from "../../services/todo-post"
import { CategoryFormData } from "../../components/CategoryForm/schema"
import CategoryForm from "../../components/CategoryForm/CategoryForm"

const CreateCategoryPage = () => {
  const navigate = useNavigate()

  const onSubmit = async(data: CategoryFormData) => {
    createCategory(data)
      .then(()=>navigate('/categories'))
      .catch(e=>console.log(e))
  }

  return (
    <>
      <h1>Add Your To Do List</h1>
      <CategoryForm  onSubmit={onSubmit} />
    </>
  )
}

export default CreateCategoryPage