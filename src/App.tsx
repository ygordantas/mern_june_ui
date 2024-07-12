import { useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Student from "./models/student";

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Student): void => {
    setStudents((prevState) => [...prevState, student]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <section>
            <h3>Students</h3>
            <ListGroup>
              {students.map((student, index) => (
                <ListGroup.Item key={index}>
                  {student.firstName} {student.lastName} - {student.age} -{" "}
                  {student.gradeLevel.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col>
        <Col>
          <RegistrationForm
            onFormSubmit={addStudent}
            numberOfStudentsAlreadyRegistered={students.length}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
