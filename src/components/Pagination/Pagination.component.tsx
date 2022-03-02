import PaginationItem from "./PaginationItem.component";
import classes from "./Pagination.module.scss";

interface PaginationProps {
  itemsLength: number;
  itemsPerPage: number;
  activePage: number;
  getItemsPerPageHanlder: (
    from: number,
    to: number,
    activePage: number
  ) => void;
}

function Pagination({
  itemsLength,
  getItemsPerPageHanlder,
  itemsPerPage,
  activePage,
}: PaginationProps) {
  const pages: number = itemsLength / itemsPerPage;

  let paginationItems = [];

  for (let i = 0; i < pages; i++) {
    paginationItems.push(
      <PaginationItem
        key={i}
        pageNumber={i + 1}
        getItemsPerPageHanlder={getItemsPerPageHanlder}
        itemsPerPage={itemsPerPage}
        activePage={activePage}
      />
    );
  }

  return (
    <div className={classes["pagination-container"]}>
      <ul className={classes["pagination-list"]}>{paginationItems}</ul>
    </div>
  );
}

export default Pagination;
