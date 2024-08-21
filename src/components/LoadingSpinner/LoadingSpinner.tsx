import { Spinner } from "react-bootstrap";
import classes from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className="center">
      <Spinner className={classes.spinner} animation="border" />
    </div>
  );
}
