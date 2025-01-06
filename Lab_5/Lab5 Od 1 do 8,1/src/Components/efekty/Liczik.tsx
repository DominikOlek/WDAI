import React, { useState, useEffect } from "react";


const Licznik: React.FC = () => {
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        console.log("Hello World");
    }, []);

    useEffect(() => {
        console.log("Licznik zwiększył się do "+cnt);
    }, [cnt]);

    return (
        <div>
            <div>{cnt}</div>
            <button onClick={() => setCnt(cnt+1)}>Dodaj</button>
        </div>
    );
};

export default Licznik;