import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/todo-post";
import {
  CategoryFormData,
  ColorType,
} from "../../components/CategoryForm/schema";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

interface CreateCategoryPageProps {
  onCategoryCreated: () => void;
  colors: ColorType[];
}

const CreateCategoryPage = ({
  onCategoryCreated,
  colors,
}: CreateCategoryPageProps) => {
  const navigate = useNavigate();

  console.log(colors);

  const onSubmit = async (data: CategoryFormData) => {
    createCategory(data)
      .then(() => {
        onCategoryCreated();
        navigate("/");
      })
      .catch((e) => console.error("Failed to create category", e));
  };

  return (
    <>
      <CategoryForm onSubmit={onSubmit} colors={colors} />
    </>
  );
};

export default CreateCategoryPage;
