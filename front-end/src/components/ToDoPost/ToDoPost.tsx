import { ToDoPostResponse } from "../../services/todo-post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import styles from "./ToDoPost.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

interface ToDoPostProps {
  post: ToDoPostResponse;
  onDelete: (id: number) => Promise<unknown>;
  onEdit: () => void;
}

const ToDoPost = ({ post, onDelete, onEdit }: ToDoPostProps) => {
  return (
    <div className={styles.container}>
      <input type="checkbox" className={styles.checkbox} />

      <div className={styles.taskContainer}>
        <p className={styles.content}>{post.content}</p>
        <h3 className={styles.category}>{post.category.name}</h3>
        <div className={styles.buttonsContainer}>
          <button className={styles.duplicateBtn}>
            <FontAwesomeIcon icon={faClone} className="fa-2x" />
          </button>

          <button onClick={onEdit} className={styles.editBtn}>
            <FontAwesomeIcon icon={faPen} className="fa-2x" />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className={styles.deleteBtn}
          >
            <FontAwesomeIcon icon={faTrash} className="fa-2x" />
          </button>
        </div>
      </div>

      {/* <h4 className={styles.createTime}>CreateAt:{dayjs(post.createdAt).fromNow()}</h4> */}
      {/* <h4>UpdateAT:{dayjs(post.updatedAt).fromNow()}</h4> */}
    </div>
  );
};

export default ToDoPost;
