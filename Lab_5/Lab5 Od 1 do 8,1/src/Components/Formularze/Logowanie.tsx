import React, { useEffect, useState } from "react";

const Haslo: React.FC = () => {
    const [haslo1, setHaslo1] = useState("");
    const [haslo2, setHaslo2] = useState("");
    const [nazwa, setnazwa] = useState("");
    const [disable, setDisable] = useState(Boolean);
    let alertMsg = 'Hasła nie są zgodne';
    useEffect(() => {
        if (haslo1.length == 0 || haslo2.length == 0 || nazwa.length ==0) {
            setDisable(true);
        } else if (haslo1 != haslo2 && nazwa.length > 0 && haslo1.length > 0 && haslo2.length > 0) {
            alertMsg = 'Hasła nie są zgodne';
            setDisable(false);
        } else if ( nazwa.length > 0 && haslo1.length > 0 && haslo2.length > 0) {
            alertMsg = 'Zalogowano poprawnie';
            setDisable(false);
        }
    }, [haslo1, haslo2,nazwa]);

    return (
        <>
            <label>Nazwa użytkownika: <input type='text' onChange={(e) => setnazwa(e.target.value)}></input></label>
            <label>Hasło: <input type='text' onChange={(e) => setHaslo1(e.target.value)}></input></label>
            <label> Powtórz Hasło: <input type='text' onChange={(e) => setHaslo2(e.target.value)}></input></label>
            <button onClick={() => alert(alertMsg) } disabled={disable}>Logowanie</button>
        </>
    );
};

export default Haslo;