import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getToDoPostById, ToDoPostResponse, updateToDoPostById, getAllCategories, CategoryResponse } from "../../services/todo-post"
import { ToDoPostFormData } from "../../components/ToDoPostForm/schema"
import ToDoPostForm from "../../components/ToDoPostForm/ToDoPostForm"


type FetchStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';

const EditToDoPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const [todo, setTodo] = useState<ToDoPostResponse | null>(null)
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('IDLE')
  const [error, setError] = useState<Error | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      setFetchStatus('LOADING');
      getToDoPostById(Number(id))
        .then((todoData) => {
          setTodo(todoData) 
          setFetchStatus('SUCCESS');
        })
        .catch((error:Error) => {
          setError(error);
          setFetchStatus('FAILURE');
        })
    }

    fetchCategories();
  }, [id])

  const fetchCategories = () => {
    getAllCategories()
      .then(data => setCategories(data))
      .catch(e => console.log(e));
  }

  const handleUpdateToDoPost = async(data: ToDoPostFormData) => {
    updateToDoPostById(Number(id), data)
      .then(()=>{
        navigate("/")
      })
      .catch((error) => {
        console.error('Failed to fetch todo post:', error);
      })
  }

  return (
    <>
  
      {fetchStatus === "FAILURE" && <p>Loading</p>}
      {fetchStatus === "FAILURE" && <p>{error?.message}</p>}
      {fetchStatus === "SUCCESS" && todo && (
        <ToDoPostForm
          todo={{ ...todo, categoryId: todo.category.id }}
          onSubmit={handleUpdateToDoPost}
          formType="edit"
          categories={categories} 
          onCategoryCreated={fetchCategories} 
        />
      )}
    </>
  )
}

export default EditToDoPostPage
