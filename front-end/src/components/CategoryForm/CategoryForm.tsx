import { schema, CategoryFormData } from './schema';
import classes from './CategoryForm.module.scss';
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
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.field}>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          {...register('name', { required: true })} 
        />
        {errors?.name && (
          <small className={classes.error_text}>
            {errors.name.message}
          </small>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CategoryForm;