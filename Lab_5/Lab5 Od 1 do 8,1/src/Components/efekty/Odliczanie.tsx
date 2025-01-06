import React, { useState, useEffect } from "react";


const Odliczanie: React.FC = () => {
    const [time, setTime] = useState(15);
    const [wart, setWart] = useState("STOP");
    const [status, setStatus] = useState(Boolean);
    const [disable, setDisable] = useState(Boolean);

    useEffect(() => {
        let interval:number;
        if (status) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = Math.round((prevTime - 0.1) * 100) / 100;
                    if (newTime <= 0) {
                        setWart("Odliczanie zakończone");
                        setDisable(true);
                        clearInterval(interval!);
                        return 0;
                    }
                    return newTime;
                });
            }, 100);
        }
        setWart(wart == "STOP" ? "START" : "STOP");
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [status]);

    function click() {
        setStatus((prev) => !prev);
    }

    return (
        <div>
            {time}
            <button onClick={click} disabled={disable} >{wart}</button>
        </div>
    );
};

export default Odliczanie;