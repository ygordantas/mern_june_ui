import { Alert } from "react-bootstrap";
import classes from "./ErrorMessageAlert.module.css";

interface ErrorMessageAlertProps {
  message?: string;
}

export default function ErrorMessageAlert({ message }: ErrorMessageAlertProps) {
  return (
    <div className={classes.container}>
      <Alert className={classes.alert} variant="danger">
        {message || "Something went wrong. Please try again."}
      </Alert>
    </div>
  );
}
