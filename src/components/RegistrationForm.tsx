import { useState } from "react";
import GRADE_LEVELS from "../constants/gradeLevels";
import Student from "../models/student";

interface RegistrationFormProps {
  numberOfStudentsAlreadyRegistered: number;
}

export default function RegistrationForm({
  numberOfStudentsAlreadyRegistered,
}: RegistrationFormProps) {
  const [student, setStudent] = useState<Student>({
    firstName: "",
    lastName: "",
    age: 0,
    gradeLevel: {
      id: 0,
      name: "",
    },
  });

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(student, null, 2));
  };

  return (
    <section>
      <h3>New Student Registration Form</h3>
      <span>
        Number of students registered: {numberOfStudentsAlreadyRegistered}
      </span>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={(event) =>
            setStudent((mostRecentState) => ({
              ...mostRecentState,
              firstName: event.target.value,
            }))
          }
          type="text"
          placeholder="First Name"
          value={student.firstName}
        />
        <input
          onChange={(event) =>
            setStudent((mostRecentState) => ({
              ...mostRecentState,
              lastName: event.target.value,
            }))
          }
          type="text"
          placeholder="Last Name"
          value={student.lastName}
        />
        <input
          onChange={(event) =>
            setStudent((mostRecentState) => ({
              ...mostRecentState,
              age: +event.target.value,
            }))
          }
          min={1}
          max={110}
          type="number"
          placeholder="Age"
          value={student.age || ""}
        />
        <select
          onChange={(event) =>
            setStudent((mostRecentState) => ({
              ...mostRecentState,
              gradeLevel: GRADE_LEVELS.find(
                (gl) => gl.id === +event.target.value
              ) || { id: 0, name: "" },
            }))
          }
        >
          {GRADE_LEVELS.map((gradeLevel) => (
            <option value={gradeLevel.id} key={gradeLevel.id}>
              {gradeLevel.name}
            </option>
          ))}
        </select>

        <button type="submit">Complete Registration</button>
      </form>
    </section>
  );
}
