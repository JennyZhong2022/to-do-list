import { useEffect, useState } from 'react';
import { schema, ToDoPostFormData } from './schema';
import styles from '../CategoryForm/CategoryForm.module.scss';
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.field}>
      <label htmlFor="category">Category:</label>
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
        <small className={styles.error_text}>
          {errors.categoryId.message}
        </small>
      )}
    </div>

      <div className={styles.field}>
        <label htmlFor="content">Content:</label>
        <input {...register('content')} id="content" style={{width:'300px'}}></input>
        {errors?.content && (
          <small className={styles.error_text}>{errors.content.message}</small>
        )}
      </div>

      <div className={styles.field}>
      <button className={styles.submitBtn}>
        {formType === 'create' ? 'Create ToDo' : 'Update ToDo'}
      </button>
      </div> 
    </form>
  );
}

export default ToDoPostForm