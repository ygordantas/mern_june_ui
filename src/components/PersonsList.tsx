import { useState } from "react";
import Person from "../models/person";

export default function PersonsList() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: "John", age: 25, email: "johN@email.com" },
    { id: 2, name: "Jane", age: 30, email: "jane@email.com" },
    { id: 3, name: "Doe", age: 35, email: "doe@email.com" },
  ]);

  return (
    <div>
      {people.map((person) => (
        <p key={person.id}>
          {person.name}, {person.email}. <strong>{person.age}</strong>
        </p>
      ))}
      <button
        onClick={() => {
          setPeople((prevState) => {
            const updatedPeopleList = prevState.map((person) => ({
              ...person,
              age: person.age + 1,
            }));

            return updatedPeopleList;
          });
        }}
      >
        Make everyone older :/
      </button>
    </div>
  );
}
