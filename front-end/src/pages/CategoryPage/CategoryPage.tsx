import { CategoryResponse, deleteCategoryById } from "../../services/todo-post";
import CategoryList from "../../components/CategoryList/CategoryList";
import styles from "./CategoryPage.module.scss";

interface CategoryPageProps {
  onPostCreated: () => void;
  categories: CategoryResponse[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryResponse[]>>;
}

const CategoryPage = ({
  onPostCreated,
  categories,
  setCategories,
}: CategoryPageProps) => {
  const onDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Deleting a category will also delete all associated tasks. Are you sure you want to proceed?"
    );
    if (!confirmed) {
      return;
    }
    const isConfirmed = await deleteCategoryById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isConfirmed) {
      const updatedPosts = categories.filter((post) => post.id !== id);
      setCategories(updatedPosts);
      onPostCreated();
    }
  };

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category) => (
        <CategoryList
          key={category.id}
          category={category}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryPage;
