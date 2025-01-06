export interface User {
    username: string;
    fullName: string;
    id: number;
}

export interface KomenProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}