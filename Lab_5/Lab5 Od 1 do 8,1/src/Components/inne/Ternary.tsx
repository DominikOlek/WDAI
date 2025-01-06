import React from "react";

const Ternary: React.FC = () => {
    let a:Boolean = true;
    let b:Boolean = false;

    return (
        <>
            <div>{a ? 'Stwierdzenie a jest prawdziwe' : 'Stwierdzenie a jest fałszywe'}</div>
            {b ? <div>Stwierdzenie b jest prawdziwe</div> : <div>Stwierdzenie b jest fałszywe</div>}
        </>
    );
};

export default Ternary;