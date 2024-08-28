import { useEffect, useState } from "react"
import { deleteToDoPostById, getAllToDoPosts, ToDoPostResponse } from "../../services/todo-post"
import ToDoPost from "../../components/ToDoPost/ToDoPost"

const ToDoPostsPage = () => {
  const [posts,setPosts]=useState<ToDoPostResponse[]>([])


  useEffect(() => {
    getAllToDoPosts()
      .then(data => setPosts(data))
      .catch(e=>console.log(e)
    )
    
  }, [])
  
  const onDelete = async(id:number) => {
    const confirmed = window.confirm("Are you sure?")
    if (!confirmed) {
      return
    }
    const isConfirmed = await deleteToDoPostById(id).catch(e => {
      console.log(e)
      return false
    })
    if (isConfirmed) {
      const updatedPosts = posts.filter((post) => post.id !== id)
      setPosts(updatedPosts)
    }

    
  }

  return (
    <>
    {posts.map((post) => (
      <ToDoPost key={post.id} post={post} onDelete={onDelete} />
    )

    )}
  </>
  )
}

export default ToDoPostsPage