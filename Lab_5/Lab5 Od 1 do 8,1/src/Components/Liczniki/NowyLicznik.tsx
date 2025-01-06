import React, { useState } from "react";
import Przycisk from './Przycisk'

const NowyLicznik: React.FC = () => {
    const [cnt, setCnt] = useState(0);
    return (
        <div>
            <div>{cnt}</div>
            <Przycisk add={setCnt} stan={cnt} />
        </div>
    );
};

export default NowyLicznik;