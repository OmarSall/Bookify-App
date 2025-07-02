import styles from "./CustomPagination.module.css";

interface CustomPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 7;
const INITIAL_VISIBLE_PAGES = 5;
const FIRST_PAGE = 1;

const CustomPagination = ({
                              totalPages,
                              currentPage,
                              onPageChange,
                          }: CustomPaginationProps) => {
    const getPageNumbers = (): Array<number | string>  => {
        const pages = [];

        if (totalPages <= MAX_VISIBLE_PAGES) {
            for (let i = FIRST_PAGE; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            for (let i = FIRST_PAGE; i <= INITIAL_VISIBLE_PAGES; i++) {
                pages.push(i);
            }

            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const renderPageButtons = () => {
        let ellipsisCounter = 0;

        return getPageNumbers().map((item: number | string) => {
            if (item === "...") {
                ellipsisCounter++;
                return (
                    <span key={`ellipsis-${ellipsisCounter}`} className={styles.ellipsis}>
                        ...
                    </span>
                );
            }

            if (typeof item === "number") {
                return (
                    <button
                        key={`page-${item}`}
                        className={`${styles.pageButton} ${item === currentPage ? styles.active : ""}`}
                        onClick={() => onPageChange(item)}
                    >
                        {item}
                    </button>
                );
            }
        });
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.arrow}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === FIRST_PAGE}
            >
                {"<"}
            </button>

            {renderPageButtons()}

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