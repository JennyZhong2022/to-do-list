import { useEffect, useState } from "react"
import { CategoryResponse, deleteToDoPostById, getAllCategories, getAllToDoPosts, ToDoPostResponse } from "../../services/todo-post"
import ToDoPost from "../../components/ToDoPost/ToDoPost"
import styles from './ToDoPostsPage.module.scss'
import CreateToDoPostPage from "../CreateToDoPostPage/CreateToDoPostPage"
import CreateCategoryPage from "../CreateCategoryPage/CreateCategoryPage"
import CategoryPage from "../CategoryPage/CategoryPage"


const ToDoPostsPage = () => {
  const [posts, setPosts] = useState<ToDoPostResponse[]>([])
  const [addTodoOpen, setAddTodoOpen] = useState(false)
  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const [addCategoryListOpen, setAddCategoryListOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    getAllToDoPosts()
      .then(data => setPosts(data))
      .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  
  const fetchCategories = () => {
    getAllCategories()
    .then(data => { setCategories(data), console.log(data) })
    .catch(e=>console.log(e)
  )
  }


  const onDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure?")
    if (!confirmed) {
      return
    }
    const isConfirmed = await deleteToDoPostById(id).catch(e => {
      console.log(e)
      return false
    })
    if (isConfirmed) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  return (
    <div className={styles.todoPageContainer}>
      <h1 className={styles.h1}>My TO-DO List</h1>
      <div className={styles.addBtnContainer}>

      <button onClick={() => setAddCategoryListOpen(!addCategoryListOpen)} className={styles.addBtn}>Categories List</button>  

        <button onClick={() => setAddCategoryOpen(!addCategoryOpen)} className={styles.addBtn}>Add Category</button>   
        <button onClick={() => setAddTodoOpen(!addTodoOpen)} className={styles.addBtn}>Add Post</button>
      </div>

      <div className={styles.addForm}>
        {addCategoryListOpen && <CategoryPage categories={categories} setCategories={setCategories} onPostCreated={fetchPosts}/>}
        {addCategoryOpen && <CreateCategoryPage onCategoryCreated={fetchCategories} /> }
        {addTodoOpen && <CreateToDoPostPage onPostCreated={fetchPosts}
          categories={categories} 
          onCategoryCreated={fetchCategories}
        />}
      </div>
   

      {/* <div className={styles.TodoPostContainer}> */}
      
        
        <div className={styles.headerContainer}>
        <div className={styles.checkboxContainer}>
        <input type="checkbox" id="selectAll" className={styles.checkbox} />
        {/* <label htmlFor="selectAll" className={styles.selectAllLabel}>Select All</label> */}
      </div>
          
        <div className={styles.headerTitlesContainer}>
          <h4 className={styles.taskName}>Task Name</h4>
          <h4 className={styles.category}>Category</h4>
          <div className={styles.headersBtnContainer}>
          <h4 className={styles.btnIconName}>Duplicate</h4>
          <h4 className={styles.btnIconName}>Edit</h4>
          <h4 className={styles.btnIconName}>Remove</h4>
          </div>
        </div>
        </div>

        

        {posts.map(post => (
          <ToDoPost key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
    // </div>
  )
}

export default ToDoPostsPage
