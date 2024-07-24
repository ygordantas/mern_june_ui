import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={classes.container + " center"}>
      <h2>404</h2>
      <h3>Sorry, we couldn't find the page</h3>
      <Link type="button" to="/">
        Return to Dashboard
      </Link>
    </div>
  );
}
