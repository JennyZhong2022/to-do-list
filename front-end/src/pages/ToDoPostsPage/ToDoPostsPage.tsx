import { useEffect, useState } from "react";
import {
  CategoryResponse,
  createToDoPost,
  deleteAllToDoPost,
  deleteToDoPostById,
  getAllCategories,
  getAllToDoPosts,
  getCategoriesColors,
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColorType } from "../../components/CategoryForm/schema";

const ToDoPostsPage = () => {
  const [posts, setPosts] = useState<ToDoPostResponse[]>([]);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [boxChecked, setBoxChecked] = useState(false);
  const [checkedPosts, setCheckedPosts] = useState<number[]>([]);

  const [colors, setColors] = useState<ColorType[]>([]);

  useEffect(() => {
    getCategoriesColors()
      .then((fetchedColors) => setColors(fetchedColors as ColorType[]))
      .catch((e) => {
        console.error("Failed to fetch colors", e);
        setColors([]);
      });
  }, []);

  // fetch todo posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    getAllToDoPosts()
      .then((data) => {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setPosts(sortedData);
      })
      .catch((e) => console.log(e));
  };

  // fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getAllCategories()
      .then((data) => {
        setCategories(data), console.log("categories", data);
      })
      .catch((e) => console.log(e));
  };

  // handle duplicate todo post
  const handleDuplicateTodoPost = (post: ToDoPostResponse) => {
    const duplicatedPost: ToDoPostFormData = {
      content: post.content,
      categoryId: post.category.id,
    };

    createToDoPost(duplicatedPost)
      .then(() => {
        fetchPosts();
      })
      .catch((e) => console.log(e));
  };

  // handle edit todo post
  const handleEditPost = (id: number) => {
    setEditPostId(id);
  };

  const handleUpdateToDoPost = (id: number, data: ToDoPostFormData) => {
    updateToDoPostById(id, data)
      .then(() => {
        fetchPosts();
        setEditPostId(null);
      })
      .catch((error) => {
        console.error("Failed to fetch todo post:", error);
      });
  };

  // handle delete todo post by id
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

  // handle delete all todo posts
  const handleDeleteAll = async () => {
    const confirmed = window.confirm("Are you sure to delete all todo?");
    if (!confirmed) {
      return;
    }

    deleteAllToDoPost()
      .then(() => {
        fetchPosts();
      })

      .catch((e) => {
        console.log(e);
        return false;
      });
  };

  //handle checkbox
  const handleSelectAll = () => {
    if (boxChecked) {
      setCheckedPosts([]);
    } else {
      setCheckedPosts(posts.map((post) => post.id));
    }
    setBoxChecked(!boxChecked);
  };

  const handleCheckboxChange = (id: number) => {
    if (checkedPosts.includes(id)) {
      setCheckedPosts(checkedPosts.filter((postId) => postId !== id));
    } else {
      setCheckedPosts([...checkedPosts, id]);
    }
  };

  console.log("posts", posts);

  return (
    <div className={styles.todoPageContainer}>
      <div className={styles.todoPageTopContainer}>
        <h1 className={styles.h1}>my to-do</h1>
        <div className={styles.addBtnContainer}>
          <button
            onClick={() => setAddTodoOpen(!addTodoOpen)}
            className={styles.addBtn}
          >
            <FontAwesomeIcon icon={faPlus} className="fa-1x" />
          </button>
        </div>
      </div>

      <div className={styles.todoPageContentContainer}>
        <div className={styles.categoryContainer}>
          <CategoryPage
            categories={categories}
            setCategories={setCategories}
            onPostCreated={fetchPosts}
          />

          <CreateCategoryPage
            onCategoryCreated={fetchCategories}
            colors={colors}
          />
        </div>

        <div className={styles.postsContainer}>
          <div className={styles.addForm}>
            {addTodoOpen && (
              <CreateToDoPostPage
                onPostCreated={fetchPosts}
                categories={categories}
                onCategoryCreated={fetchCategories}
              />
            )}
          </div>

          <HeaderTitles
            handleSelectAll={handleSelectAll}
            boxChecked={boxChecked}
          />

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
                  checked={checkedPosts.includes(post.id)}
                  onCheckboxChange={() => handleCheckboxChange(post.id)}
                  post={post}
                  onDelete={onDelete}
                  onEdit={() => handleEditPost(post.id)}
                  onDuplicate={() => handleDuplicateTodoPost(post)}
                />
              )}
            </div>
          ))}

          {/* will do delete ALL button later */}
          {checkedPosts.length > 0 && (
            <div className={styles.deleteALLBtnContainer}>
              <button onClick={handleDeleteAll} className={styles.deleteALLBtn}>
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoPostsPage;
