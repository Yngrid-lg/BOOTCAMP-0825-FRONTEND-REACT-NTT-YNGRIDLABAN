import type { FC } from "react";
import styles from "./Header.module.css";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>🏪 My Market</h1>
    </div>
  );
};

export default Header;
