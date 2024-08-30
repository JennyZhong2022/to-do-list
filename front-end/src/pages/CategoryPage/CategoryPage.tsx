import { useEffect, useState } from "react"
import { CategoryResponse, deleteCategoryById, getAllCategories } from "../../services/todo-post"
import CategoryList from "../../components/CategoryList/CategoryList"






const CategoryPage = () => {
  const [categories,setCategories]=useState<CategoryResponse[]>([])


  useEffect(() => {
    getAllCategories()
      .then(data => { setCategories(data), console.log(data) })
      .catch(e=>console.log(e)
    )
    
  }, [])
  
  const onDelete = async(id:number) => {
    const confirmed = window.confirm("Are you sure?")
    if (!confirmed) {
      return
    }
    const isConfirmed = await deleteCategoryById(id).catch(e => {
      console.log(e)
      return false
    })
    if (isConfirmed) {
      const updatedPosts = categories.filter((post) => post.id !== id)
      setCategories(updatedPosts)
    }

    
  }

  return (
    <>
    {categories.map((category) => (
      <CategoryList key={category.id} category={category}
        onDelete={onDelete}
      />
    )

    )}
  </>
  )

}

export default CategoryPage