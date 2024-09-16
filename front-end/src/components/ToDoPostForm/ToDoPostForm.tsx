import { schema, ToDoPostFormData } from "./schema";
import styles from "./TodoPostForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryResponse } from "../../services/todo-post";
import { useEffect } from "react";

interface ToDoPostFormProps {
  formType: "create" | "edit";
  todo?: ToDoPostFormData;
  onSubmit: (data: ToDoPostFormData) => unknown;
  onCategoryCreated: () => void;
  categories: CategoryResponse[];
}

const ToDoPostForm = ({
  onSubmit,
  todo,
  formType,
  onCategoryCreated,
  categories,
}: ToDoPostFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<ToDoPostFormData>({
    resolver: zodResolver(schema),
    defaultValues: todo, // Prefill form with previous data
  });

  useEffect(() => {
    onCategoryCreated();
  }, []);

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        {/* <label htmlFor="category" id="todoPostCategory">
          Category:
        </label> */}
        <div>
          <select
            id="category"
            {...register("categoryId", { required: true, valueAsNumber: true })}
          >
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
      </div>

      <div className={styles.field}>
        {/* <label htmlFor="content" id="todoPostContent">
          Content:
        </label> */}
        <div>
          <input {...register("content")} id="content"></input>
          {errors?.content && (
            <small className={styles.error_text}>
              {errors.content.message}
            </small>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <button className={styles.submitBtn}>
          {formType === "create" ? "Create ToDo" : "Update ToDo"}
        </button>
      </div>
    </form>
  );
};

export default ToDoPostForm;
