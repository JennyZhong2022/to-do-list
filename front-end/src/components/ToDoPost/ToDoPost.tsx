import { ToDoPostResponse } from "../../services/todo-post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faTrash,
  faPen,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "./ToDoPost.module.scss";

dayjs.extend(relativeTime);

interface ToDoPostProps {
  post: ToDoPostResponse;
  onDelete: (id: number) => Promise<unknown>;
  onEdit: () => void;
  onDuplicate: () => void;
  checked: boolean;
  onCheckboxChange: () => void;
}

const ToDoPost = ({
  post,
  onDelete,
  onEdit,
  onDuplicate,
  checked,
  onCheckboxChange,
}: ToDoPostProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={onCheckboxChange}
      />

      <div className={styles.taskContainer}>
        <p className={styles.content}>{post.content}</p>
        <div
          className={styles.categoryContainer}
          style={{ backgroundColor: post.category.color }}
        >
          <h3 className={styles.category}>{post.category.name}</h3>
        </div>
        <div className={styles.actionsWrapper} ref={menuRef}>
          {/* show action icons for larger screens */}
          <div className={styles.actionIcons}>
            <button onClick={onDuplicate} className={styles.duplicateBtn}>
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

          {/* show menu button for smaller screens */}
          <button className={`${styles.dropdownBtn}`} onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="fa-1x" />
          </button>

          {/* show dropdown menu for smaller screens */}
          {menuOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={onDuplicate} className={styles.duplicateBtn}>
                <FontAwesomeIcon icon={faClone} className="fa-1x" />
                Duplicate
              </button>
              <button onClick={onEdit} className={styles.editBtn}>
                <FontAwesomeIcon icon={faPen} className="fa-1x" />
                Edit
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className={styles.deleteBtn}
              >
                <FontAwesomeIcon icon={faTrash} className="fa-1x" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoPost;
