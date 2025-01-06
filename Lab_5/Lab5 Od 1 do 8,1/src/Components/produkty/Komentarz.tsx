import { useState } from "react";
import React from "react";
import { KomenProps } from "./KomentarzI"

const Komentarz: React.FC<KomenProps> = ({ id,body,postId,likes,user }) => {
    const [like, setLike] = useState(likes);

    const addlike = () => {
        setLike((prev)=>prev+1);
    }
    const dislike = () => {
        setLike((prev) => prev - 1);
    }
    

    return (
        <div>
            <h4>{user.fullName} <sub>{user.username}</sub> pisze do postu {postId}</h4>
            <p>{body}</p>
            <span><button onClick={addlike}>&#128077;</button>Ocena: {like} <button onClick={dislike}>&#128078;</button></span>
            <br></br><br></br>
        </div>
    );
};

export default Komentarz;