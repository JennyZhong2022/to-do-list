import { CategoryResponse } from "../../services/todo-post";
import styles from "./CategoryList.module.scss";

interface CategoryProps {
  category: CategoryResponse;
  onDelete: (id: number) => Promise<unknown>;
}

const CategoryList = ({ category, onDelete }: CategoryProps) => {
  console.log("categories", category.color);
  return (
    <div
      className={styles.categoryContainer}
      style={{ backgroundColor: category.color }}
    >
      <p>{category.name}</p>
      <button onClick={() => onDelete(category.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
        >
          <path d="M18.36 6.36a1 1 0 00-1.41 0L12 11.29 7.05 6.34a1 1 0 10-1.41 1.41L10.59 12l-5.95 5.95a1 1 0 101.41 1.41L12 12.71l5.95 5.95a1 1 0 001.41-1.41L13.41 12l5.95-5.95a1 1 0 000-1.41z" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryList;
