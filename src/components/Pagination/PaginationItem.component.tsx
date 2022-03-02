import classes from "./PaginationItem.module.scss";

interface PaginationItemProps {
  pageNumber: number;
  itemsPerPage: number;
  activePage: number;
  getItemsPerPageHanlder: (
    from: number,
    to: number,
    activePage: number
  ) => void;
}

const PaginationItem = ({
  pageNumber,
  activePage,
  itemsPerPage,
  getItemsPerPageHanlder,
}: PaginationItemProps) => {
  const page = pageNumber - 1;
  const from = page * itemsPerPage;
  const to = from + itemsPerPage;

  return (
    <li
      className={`${classes["pagination-item"]} ${
        activePage === pageNumber && classes["active"]
      }`}
    >
      <button
        onClick={() => getItemsPerPageHanlder(from, to, pageNumber)}
        className="cta"
      >
        {pageNumber}
      </button>
    </li>
  );
};

export default PaginationItem;
