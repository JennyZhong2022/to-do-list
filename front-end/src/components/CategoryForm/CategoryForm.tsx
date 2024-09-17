import { schema, CategoryFormData, ColorType } from "./schema";
import styles from "./CategoryForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CategoryFormProps {
  category?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => unknown;
  colors: ColorType[];
}

const CategoryForm = ({ onSubmit, colors }: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
  });

  const handleColorSelect = (color: ColorType) => {
    setValue("color", color, { shouldValidate: true });
  };

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label htmlFor="category" id="categoryLabel">
          Category:
        </label>
        <div>
          <input id="category" {...register("name", { required: true })} />
          {errors?.name && (
            <small className={styles.error_text}>{errors.name.message}</small>
          )}
        </div>
      </div>
      <div className={styles.colorAndBtnContainer}>
        <div className={styles.dropdownContainer}>
          <CustomDropdown colors={colors} onSelect={handleColorSelect} />
          {errors.color && (
            <small className={styles.error_text}>{errors.color.message}</small>
          )}
        </div>

        <div className={styles.btnField}>
          <button type="submit" className={styles.submitBtn}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
