import { useState,useEffect } from "react";
import React from "react";
import { KomenProps } from "./KomentarzI"
import Komentarz from "./Komentarz";

const Komentarze: React.FC = () => {
    const [comments, setComments] = useState<KomenProps[]>([]);

    useEffect(() => {
        async function getData() {
            const url = "https://dummyjson.com/comments";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.text();
                const arr = JSON.parse(json);
                setComments(arr.comments);

            } catch (error) {
                console.error(error.message);
            }
        };
        getData();
    },[]);


    return (
        <div>
            {comments.map((v,k) => (
                <Komentarz id={v.id} body={v.body} likes={v.likes} postId={v.postId} user={v.user} key={k}/>
            ))}
        </div>
    );
};

export default Komentarze;