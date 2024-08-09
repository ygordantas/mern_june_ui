import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard/CustomCard";
import FormInput from "../../components/FormInput/FormInput";
import { UserContext } from "../../contexts/userContext";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setUser({
      email,
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        number: "",
        country: "",
      },
    });

    navigate("/");
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

  return <CustomCard title="Login" content={form} footer={footer} />;
}
