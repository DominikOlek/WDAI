import React, { useState } from "react";

const Formularz: React.FC = () => {
    const [wart, setWart] = useState("");
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setWart(e.target.value);
    };
    return (
        <>
            <input type='text' onChange={handleChange}></input>
            <div>{wart}</div>
        </>
    );
};

export default Formularz;