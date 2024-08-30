
import { CategoryResponse } from "../../services/todo-post"

interface CategoryProps{
  category: CategoryResponse
  // onDelete: (id:number)=>Promise<unknown>
}


const CategoryList = ({category}:CategoryProps) => {


  return (
    <div>
      
      <p>{category.name}</p>
      {/* <button onClick={() => onDelete(post.id)}>Delete</button> */}
      
    </div>
  )
}

export default CategoryList