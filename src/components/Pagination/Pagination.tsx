import React from "react";
import styles from "./Pagination.module.css";

interface Pagination {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

const Pagination: React.FC<Pagination> = ({
    currentPage,
    totalPages,
    goToPage,
}) => {

    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className={styles.previous} //---
            >
                {"<"} Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={currentPage === i + 1 ? styles.active : ""}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Siguiente {">"}
            </button>
        </div>
    );
};

export default Pagination;
