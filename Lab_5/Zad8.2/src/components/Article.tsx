import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArticleI } from "./ArticleI";


const Article: React.FC = () => {
    const { id } = useParams();
    const [article, setArticle] = useState<ArticleI | null>(null);

    useEffect(() => {
        const storedArticles = localStorage.getItem("articles");
        if (storedArticles) {
            const articles: ArticleI[] = JSON.parse(storedArticles);
            const foundArticle = articles.find((a) => a.id == Number(id));
            setArticle(foundArticle || null);
        }
    }, [id]);

    if (!article) return <p>Nie znaleziono artykułu.</p>;

    return (
        <div>
            <h1>{article.title}</h1>
            <p style={{ fontSize: 20 }}>Treść: {article.content}</p>
            <Link to="/blog">
                <button>Powrót do listy</button>
            </Link>
        </div>
    );
};

export default Article;