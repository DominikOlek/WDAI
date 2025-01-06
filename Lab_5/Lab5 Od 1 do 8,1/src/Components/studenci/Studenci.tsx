import React from "react";

const Studenci: React.FC = () => {
    interface Student {
        name: string;
        lastName: string;
        year: number;
    }
    const Students: Student[] = [{ name: "Dominik", lastName: "Oleksy", year: 2001 }, { name: "Dominik", lastName: "Oleksy", year: 2002 }, { name: "Dawid", lastName: "Kozacki", year: 1990 }];

    return (
        <table>
            <tr>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Rocznik</th>
            </tr>
            {Students.map((v,k) => (
                <tr key={k }><td>{v.name}</td><td>{v.lastName}</td><td>{v.year}</td></tr>
            ))}
        </table>
    );
};

export default Studenci;