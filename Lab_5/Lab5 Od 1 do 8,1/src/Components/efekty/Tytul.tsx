import React, { useState, useEffect } from "react";


const Tytul: React.FC = () => {
    const [title, setTitle] = useState("");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div>
            <label>Podaj tytuł: <input type='text' onChange={(e) => setTitle(e.target.value)}></input></label>
        </div>
    );
};

export default Tytul;