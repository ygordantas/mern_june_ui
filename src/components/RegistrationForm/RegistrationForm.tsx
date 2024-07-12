import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import GRADE_LEVELS from "../../constants/gradeLevels";
import Student from "../../models/student";
import classes from "./RegistrationForm.module.css";

const defaultStudent: Student = {
  firstName: "",
  lastName: "",
  age: 0,
  gradeLevel: {
    id: 0,
    name: "",
  },
};

interface RegistrationFormProps {
  numberOfStudentsAlreadyRegistered: number;
  onFormSubmit: (student: Student) => void;
}

export default function RegistrationForm({
  numberOfStudentsAlreadyRegistered,
  onFormSubmit,
}: RegistrationFormProps) {
  const [student, setStudent] = useState<Student>({ ...defaultStudent });

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(student);
    setStudent({ ...defaultStudent });
  };

  return (
    <section>
      <h3 className={classes.title}>New Student Registration Form</h3>
      <span>
        Number of students registered: {numberOfStudentsAlreadyRegistered}
      </span>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={(event) =>
              setStudent((mostRecentState) => ({
                ...mostRecentState,
                firstName: event.target.value,
              }))
            }
            required
            value={student.firstName}
            type="text"
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={(event) =>
              setStudent((mostRecentState) => ({
                ...mostRecentState,
                lastName: event.target.value,
              }))
            }
            required
            value={student.lastName}
            type="textarea"
            placeholder="Last Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={(event) =>
              setStudent((mostRecentState) => ({
                ...mostRecentState,
                age: +event.target.value,
              }))
            }
            required
            value={student.age || ""}
            type="number"
            placeholder="Age"
            min={1}
            max={110}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gradeLevel">
          <Form.Label>Grade Level</Form.Label>
          <Form.Select
            onChange={(event) =>
              setStudent((mostRecentState) => ({
                ...mostRecentState,
                gradeLevel: GRADE_LEVELS.find(
                  (gl) => gl.id === +event.target.value
                ) || { id: 0, name: "" },
              }))
            }
            aria-label="Select grade level"
          >
            {GRADE_LEVELS.map((gradeLevel) => (
              <option value={gradeLevel.id} key={gradeLevel.id}>
                {gradeLevel.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button className="btn btn-primary" type="submit">
          Complete Registration
        </Button>
      </Form>
    </section>
  );
}
