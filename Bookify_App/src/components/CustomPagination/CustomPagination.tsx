import styles from "./CustomPagination.module.css";

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({
                              totalPages,
                              currentPage,
                              onPageChange,
                          }: CustomPaginationProps) => {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }

            if (totalPages > 6) {
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.arrow}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>

            {getPageNumbers().map((item, idx) =>
                    item === "..." ? (
                        <span key={idx} className={styles.ellipsis}>
            ...
          </span>
                    ) : (
                        <button
                            key={idx}
                            className={`${styles.pageButton} ${
                                item === currentPage ? styles.active : ""
                            }`}
                            onClick={() => onPageChange(Number(item))}
                        >
                            {item}
                        </button>
                    )
            )}

            <button
                className={styles.arrow}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
        </div>
    );
};

export default CustomPagination;
