import { useContext, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard/CustomCard";
import FormInput from "../../components/FormInput/FormInput";
import Address from "../../models/Address";
import classes from "./SignUpPage.module.css";
import usersService from "../../services/usersService";
import { UserContext } from "../../contexts/userContext";
import AppError from "../../models/AppError";
import { AxiosError } from "axios";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessageAlert from "../../components/ErrorMessageAlert/ErrorMessageAlert";

const SignUpPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { setUserId, setToken } = useContext(UserContext);

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppError | undefined>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>();
  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const dateOfBirthLimit = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }, []);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await usersService.signUp({
        id: "",
        firstName,
        lastName,
        email,
        dateOfBirth: dateOfBirth!,
        address,
        password,
        repeatPassword: confirmPassword,
      });

      setUserId(response.id);
      setToken(response.token);
      navigate("/");
    } catch (error) {
      const e = error as AxiosError;
      setError({ message: e.response?.data as string });
    } finally {
      setIsLoading(false);
    }
  };

  const form = (
    <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
      <fieldset>
        <Row>
          <Col>
            <FormInput
              type="text"
              required
              title="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <FormInput
              type="text"
              required
              title="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col>
            <FormInput
              type="date"
              required
              title="Date of Birth"
              value={dateOfBirth ?? ""}
              onChange={(e) => setDateOfBirth(new Date(e.target.value))}
              max={dateOfBirthLimit.toISOString().split("T")[0]}
            />
          </Col>
        </Row>
      </fieldset>

      <fieldset>
        <Row>
          <Col>
            <FormInput
              type="text"
              required
              title="Street Number"
              value={address.number}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  number: e.target.value,
                }))
              }
            />
          </Col>
          <Col>
            <FormInput
              type="text"
              required
              title="Street Name"
              value={address.street}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  street: e.target.value,
                }))
              }
            />
          </Col>
          <Col>
            <FormInput
              type="text"
              required
              title="City"
              value={address.city}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }))
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormInput
              type="text"
              required
              title="State/Province"
              value={address.state}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  state: e.target.value,
                }))
              }
            />
          </Col>
          <Col>
            <FormInput
              type="text"
              required
              title="Zip Code"
              value={address.zip}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  zip: e.target.value,
                }))
              }
            />
          </Col>
          <Col>
            <FormInput
              type="text"
              required
              title="Country"
              value={address.country}
              onChange={(e) =>
                setAddress((prevState) => ({
                  ...prevState,
                  country: e.target.value,
                }))
              }
            />
          </Col>
        </Row>
      </fieldset>

      <fieldset>
        <Row>
          <Col>
            <FormInput
              type="email"
              required
              title="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <FormInput
              type="password"
              required
              title="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col>
            <FormInput
              type="password"
              required
              title="Repeat Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
        </Row>
        {password && confirmPassword && password !== confirmPassword && (
          <div className={classes.error_message + " error_text"}>
            Passwords do not match
          </div>
        )}
      </fieldset>
      <div className={classes.submit_btn_container}>
        <Button
          disabled={password !== confirmPassword || !email}
          className={classes.submit_btn}
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );

  const footer = (
    <p>
      Already have an account? <Link to="/account/login">Log in here!</Link>
    </p>
  );

  const pageContent = isLoading ? (
    <LoadingSpinner />
  ) : (
    <CustomCard title="Sign up" content={form} footer={footer} />
  );

  return error ? <ErrorMessageAlert message={error.message} /> : pageContent;
};

export default SignUpPage;
