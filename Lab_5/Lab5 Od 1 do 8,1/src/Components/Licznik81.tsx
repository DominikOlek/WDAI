import React, { useEffect, useState } from "react";


const Licznik81: React.FC = () => {
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("licznik"))
            setCnt(Number(localStorage.getItem("licznik")));
    }, []);

    return (
        <div>
            <div>{cnt}</div>
            <button onClick={() => { setCnt(cnt + 1); localStorage.setItem("licznik",(cnt+1).toString()); }}>Dodaj</button>
        </div>
    );
};

export default Licznik81;