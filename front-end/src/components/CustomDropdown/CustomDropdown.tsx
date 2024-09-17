import { useEffect, useState } from "react";
import { ColorType } from "../CategoryForm/schema";
import styles from "./CustomDropdown.module.scss";

interface CustomDropdownProps {
  colors: ColorType[];
  onSelect: (color: ColorType) => void;
}

const CustomDropdown = ({ colors, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);

  // Set default color when colors are available
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]);
      onSelect(colors[0]);
    }
  }, [colors, selectedColor, onSelect]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (color: ColorType) => {
    setSelectedColor(color);
    onSelect(color);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {/* default a color */}
        {selectedColor ? (
          <span
            className={styles.colorSwatch}
            style={{ backgroundColor: selectedColor }}
          ></span>
        ) : (
          <div style={{ padding: "10px" }}>Loading colors...</div>
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {colors.map((color) => (
            <div
              key={color}
              className={styles.dropdownItem}
              onClick={() => handleSelect(color)}
            >
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor: color }}
              ></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
