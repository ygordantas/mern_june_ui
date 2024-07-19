import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../../components/FormInput/FormInput";
import Address from "../../models/Address";
import classes from "./SignUpPage.module.css";

//TODO: Set min date of birth to be 18 years old

const SignUpPage = (): JSX.Element => {
  const [validated, setValidated] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    alert(
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        address,
      })
    );
  };

  const getMinDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  };

  return (
    <Container className={classes.container + " center"}>
      <Row>
        <h3 className={classes.title}>Sign up</h3>
      </Row>

      <Row>
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
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(new Date(e.target.value))}
                  min={getMinDate().toISOString().split("T")[0]}
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
            {password !== confirmPassword && (
              <Row className={classes.error_message}>
                Passwords do not match
              </Row>
            )}
          </fieldset>
          <Row>
            <Button
              disabled={password !== confirmPassword || !email}
              className={classes.submit_btn}
              type="submit"
            >
              Sign Up
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default SignUpPage;
