import styles from "./HeaderTitles.module.scss";

interface HeaderTitlesProps {
  handleSelectAll: () => void;
  boxChecked: boolean;
}

const HeaderTitles = ({ handleSelectAll, boxChecked }: HeaderTitlesProps) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="selectAll"
          className={styles.checkbox}
          checked={boxChecked}
          onChange={handleSelectAll}
        />
        {/* <label htmlFor="selectAll" className={styles.selectAllLabel}>Select All</label> */}
      </div>

      <div className={styles.headerTitlesContainer}>
        <h4 className={styles.taskName}>Task Name</h4>
        <h4 className={styles.category}>Category</h4>
        <div className={styles.headersBtnContainer}>
          <h4 className={styles.btnIconName}>Duplicate</h4>
          <h4 className={styles.btnIconName}>Edit</h4>
          <h4 className={styles.btnIconName}>Remove</h4>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitles;
