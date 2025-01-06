import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleI } from "./ArticleI";


const Blog: React.FC = () => {
    const [articles, setArticles] = useState<ArticleI[]>([]);

    useEffect(() => {
        const storedArticles = localStorage.getItem("articles");
        if (storedArticles) {
            setArticles(JSON.parse(storedArticles));
        }
    }, []);

    return (
        <div>
            <h1>Lista artykułów</h1>
            <ol>
                {articles.map((article) => (
                    <li key={article.id} >
                        <Link to={`/article/${article.id}`}><p style={{ fontSize: 20, fontWeight: "normal" }}>{article.title}</p></Link>
                    </li>
                ))}
            </ol>
            <Link to="/dodaj">
                <button>Dodaj nowy artykuł</button>
            </Link>
        </div>
    );
};

export default Blog;