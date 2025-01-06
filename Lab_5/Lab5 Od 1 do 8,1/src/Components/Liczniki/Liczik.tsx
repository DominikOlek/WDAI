import React, { useState } from "react";


const Licznik: React.FC = () => {
    const [cnt, setCnt] = useState(0);
    return (
        <div>
            <div>{cnt}</div>
            <button onClick={() => setCnt(cnt+1)}>Dodaj</button>
        </div>
    );
};

export default Licznik;