import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard/CustomCard";
import FormInput from "../../components/FormInput/FormInput";
import { UserContext } from "../../contexts/userContext";
import classes from "./LoginPage.module.css";
import usersService from "../../services/usersService";
import { AxiosError } from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";

export default function LoginPage() {
  const { setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      setIsLoading(true);

      const userId = await usersService.login(email, password);

      setUserId(userId);

      navigate("/");
    } catch (error) {
      const err = error as AxiosError;
      setErrorMessage(err.response?.data as string);
    } finally {
      setIsLoading(false);
    }
  };

  const form = (
    <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
      <FormInput
        title="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <FormInput
        title="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className={classes.submit_btn_container}>
        <Button
          className={classes.submit_btn}
          variant="primary"
          type="submit"
          disabled={!email || !password}
        >
          Login
        </Button>
      </div>
    </Form>
  );

  const footer = (
    <p>
      Don't have an account? <Link to="/account/register">Sign up here!</Link>
    </p>
  );

  return (
    <>
      <CustomCard
        title="Login"
        content={isLoading ? <LoadingSpinner /> : form}
        footer={isLoading ? <></> : footer}
      />
      {errorMessage && <ErrorMessageAlert message={errorMessage} />}
    </>
  );
}
