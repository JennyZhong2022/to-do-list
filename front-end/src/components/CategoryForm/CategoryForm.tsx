import { schema, CategoryFormData } from './schema';
import styles from './CategoryForm.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface CategoryFormProps {
  category?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => unknown;
}

const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
  });

  if (isSubmitSuccessful) reset();

  return (
   
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="category">Category:</label>
        <div>
        <input
          id="category"
          {...register('name', { required: true })} 
        />
        {errors?.name && (
          <small className={styles.error_text}>
            {errors.name.message}
          </small>
          )}
           </div>
      </div>
      <div className={styles.field}>
        <button type="submit" className={styles.submitBtn}>Add</button>
        </div>
      </form>
    
  );
}

export default CategoryForm;