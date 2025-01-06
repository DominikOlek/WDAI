import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Witaj na blogu</h1>
            <Link to="/blog">
                <button>Przejdź do Bloga</button>
            </Link>
            <br></br><br></br><br></br><br></br>
        </div>
    );
};

export default Home;