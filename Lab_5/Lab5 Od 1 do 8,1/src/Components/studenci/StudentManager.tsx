import { useState } from "react";
import React from "react";
import Dodawanie from './Dodawanie'
import { Student } from "./StudentI";

const StudentManager: React.FC = () => {
    const [Students, setStudents] = useState<Student[]>([{ name: "Dominik", lastName: "Oleksy", year: 2001 }, { name: "Dominik", lastName: "Oleksy", year: 2002 }, { name: "Dawid", lastName: "Kozacki", year: 1990 }]);

    const dodaj = (newS: Student) => {
        setStudents((prevStudents) => ([...prevStudents, newS]));
    };

    return (
        <div>
        <table>
            <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Rocznik</th>
            </tr>
            {Students.map((v,k) => (
                <tr key={k }><td>{v.name}</td><td>{v.lastName}</td><td>{v.year}</td></tr>
            ))}
        </table>

            <Dodawanie onAdd={dodaj} />
        </div>
    );
};

export default StudentManager;