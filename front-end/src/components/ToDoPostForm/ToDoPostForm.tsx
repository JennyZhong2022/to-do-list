import { useEffect, useState } from 'react';
import { schema, ToDoPostFormData } from './schema';
import classes from './ToDoPostForm.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CategoryResponse, getAllCategories } from '../../services/todo-post';



interface ToDoPostFormProps{
  formType: 'create' | 'edit';
  todo?:ToDoPostFormData
  onSubmit: (data: ToDoPostFormData) => unknown;
}


const ToDoPostForm = ({ onSubmit,todo, formType }: ToDoPostFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<ToDoPostFormData>({
    resolver: zodResolver(schema),
    defaultValues: todo, // Prefill form with blog data 
   
  });

  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
       getAllCategories()
      .then(data=>setCategories(data))
      .catch(e=>console.error('Failed to fetch categories',e))
    
  },[])


  if (isSubmitSuccessful) reset();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
    <div className={classes.field}>
      <label htmlFor="category">Category</label>
        <select id="category" {...register('categoryId', { required: true, valueAsNumber: true })}>    
          {/* valueAsNumber: true to convert string to number */}
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors?.categoryId && (
        <small className={classes.error_text}>
          {errors.categoryId.message}
        </small>
      )}
    </div>

      <div className={classes.field}>
        <label htmlFor="content">Content</label>
        <textarea {...register('content')} id="content"></textarea>
        {errors?.content && (
          <small className={classes.error_text}>{errors.content.message}</small>
        )}
      </div>
      <button>
        {formType === 'create' ? 'Create Blog Post' : 'Update Blog Post'}
      </button>
    </form>
  );
}

export default ToDoPostForm