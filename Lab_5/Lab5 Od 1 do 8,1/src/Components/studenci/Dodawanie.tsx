import { useState } from "react";
import React from "react";
import { Student } from "./StudentI";
interface DodawanieProps {
    onAdd: (newS: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [year, setYear] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.length == 0 || lastName.length == 0 || year.length == 0) {
            alert("Wszystkie pola muszą być wypełnione");
            return;
        }
        if (isNaN(Number(year))) {
            alert("Rocznik musi być liczbą");
            return;
        }

        onAdd({name:name, lastName:lastName, year: Number(year)});

        setName("");
        setLastName("");
        setYear("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Dodaj studenta</h3>
            <div>
                <label>Imię:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>Nazwisko:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>Rocznik:
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
                </label>
            </div>
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default Dodawanie;