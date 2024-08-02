import { Button } from "react-bootstrap";
import classes from "./CustomPagination.module.css";

interface PaginationProps {
  activePage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function CustomPagination({
  activePage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i}>
        <Button
          className={activePage === i ? classes.active : ""}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      </li>
    );
  }

  return <ul className={classes.pagination}>{pages}</ul>;
}
