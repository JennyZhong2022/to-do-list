import { schema, ToDoPostFormData } from './schema';
import classes from './ToDoPostForm.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


interface ToDoPostFormProps{
  formType: 'create' | 'edit';
  onSubmit: (data: ToDoPostFormData) => unknown;
}


const ToDoPostForm = ({ onSubmit, formType }: ToDoPostFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<ToDoPostFormData>({
    resolver: zodResolver(schema),
   
  });


  if (isSubmitSuccessful) reset();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
   

      <div className={classes.field}>
        <label htmlFor="category">Category</label>
        <input id="category" type="text" {...register('category')} />
        {errors?.category && (
          <small className={classes.error_text}>
            {errors.category.message}
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