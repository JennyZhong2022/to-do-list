import { useEffect, useState } from "react";
import {
  CategoryResponse,
  deleteToDoPostById,
  getAllCategories,
  getAllToDoPosts,
  ToDoPostResponse,
  updateToDoPostById,
} from "../../services/todo-post";
import ToDoPost from "../../components/ToDoPost/ToDoPost";
import styles from "./ToDoPostsPage.module.scss";
import CreateToDoPostPage from "../CreateToDoPostPage/CreateToDoPostPage";
import CreateCategoryPage from "../CreateCategoryPage/CreateCategoryPage";
import CategoryPage from "../CategoryPage/CategoryPage";
import HeaderTitles from "../../components/HearderTitles/HeaderTitles";
import { ToDoPostFormData } from "../../components/ToDoPostForm/schema";
import ToDoPostForm from "../../components/ToDoPostForm/ToDoPostForm";

const ToDoPostsPage = () => {
  const [posts, setPosts] = useState<ToDoPostResponse[]>([]);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addCategoryListOpen, setAddCategoryListOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  // fetch todo posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    getAllToDoPosts()
      .then((data) => setPosts(data))
      .catch((e) => console.log(e));
  };

  // fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getAllCategories()
      .then((data) => {
        setCategories(data), console.log(data);
      })
      .catch((e) => console.log(e));
  };

  // handle edit to do post

  const handleEditPost = (id: number) => {
    setEditPostId(id);
  };

  const handleUpdateToDoPost = async (id: number, data: ToDoPostFormData) => {
    updateToDoPostById(id, data)
      .then(() => {
        fetchPosts();
        setEditPostId(null);
      })
      .catch((error) => {
        console.error("Failed to fetch todo post:", error);
      });
  };

  // handle delete to do post
  const onDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) {
      return;
    }
    const isConfirmed = await deleteToDoPostById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isConfirmed) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className={styles.todoPageContainer}>
      <h1 className={styles.h1}>My TO-DO List</h1>

      <div className={styles.addBtnContainer}>
        <button
          onClick={() => setAddCategoryListOpen(!addCategoryListOpen)}
          className={styles.addBtn}
        >
          Categories List
        </button>
        <button
          onClick={() => setAddCategoryOpen(!addCategoryOpen)}
          className={styles.addBtn}
        >
          Add Category
        </button>
        <button
          onClick={() => setAddTodoOpen(!addTodoOpen)}
          className={styles.addBtn}
        >
          Add Post
        </button>
      </div>

      <div className={styles.addForm}>
        {addCategoryListOpen && (
          <CategoryPage
            categories={categories}
            setCategories={setCategories}
            onPostCreated={fetchPosts}
          />
        )}
        {addCategoryOpen && (
          <CreateCategoryPage onCategoryCreated={fetchCategories} />
        )}
        {addTodoOpen && (
          <CreateToDoPostPage
            onPostCreated={fetchPosts}
            categories={categories}
            onCategoryCreated={fetchCategories}
          />
        )}
      </div>

      <HeaderTitles />

      {posts.map((post) => (
        <div key={post.id}>
          {editPostId === post.id ? (
            <ToDoPostForm
              todo={{ ...post, categoryId: post.category.id }}
              onSubmit={(data) => handleUpdateToDoPost(post.id, data)}
              formType="edit"
              categories={categories}
              onCategoryCreated={fetchCategories}
            />
          ) : (
            <ToDoPost
              post={post}
              onDelete={onDelete}
              onEdit={() => handleEditPost(post.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoPostsPage;
