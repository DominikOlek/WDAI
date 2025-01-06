import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddArticle: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title.length == 0 || content.length == 0) {
            alert("Wszystkie pola są wymagane");
            return;
        }

        const newArticle = {
            id: Date.now(),
            title: title,
            content: content
        };

        const storedArticles = localStorage.getItem("articles");
        const articles = storedArticles ? JSON.parse(storedArticles) : [];
        localStorage.setItem("articles", JSON.stringify([...articles, newArticle]));

        navigate("/blog");
    };

    return (
        <div>
            <h1>Dodaj nowy artykuł</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tytuł:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Treść:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
};

export default AddArticle;