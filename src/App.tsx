import { useState } from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import Student from "./models/student";

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <section>
        <h3>Students</h3>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student.firstName} {student.lastName} - {student.age} -{" "}
              {student.gradeLevel.name}
            </li>
          ))}
        </ul>
      </section>
      <RegistrationForm numberOfStudentsAlreadyRegistered={students.length} />

      {/* <PersonsList /> */}
    </div>
  );
};

export default App;

//RegistrationForm({numberOfStudentsAlreadyRegistered: students.length})
