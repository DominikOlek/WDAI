import React, { useEffect, useState } from "react";

const Haslo: React.FC = () => {
    const [haslo1, setHaslo1] = useState("");
    const [haslo2, setHaslo2] = useState("");
    const [wart, setWart] = useState("");
    useEffect(() => {
        if (haslo1.length == 0 && haslo2.length == 0) {
            setWart("Proszę wprowadzić hasło");
        } else if (haslo1 != haslo2) {
            setWart("Hasła nie są zgodne");
        } else {
            setWart("");
        }
    }, [haslo1, haslo2]);
    return (
        <>
            <label>Hasło: <input type='text' onChange={(e) => setHaslo1(e.target.value)}></input></label>
            <label> Powtórz Hasło: <input type='text' onChange={(e) => setHaslo2(e.target.value)}></input></label>
            <div>{wart}</div>
        </>
    );
};

export default Haslo;