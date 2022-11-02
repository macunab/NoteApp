export interface Category {
    _id?: string;
    name: string;
    color: string;
}

export interface Note {
    _id?: string;
    title: string;
    content: string;
    category?: Category;
    fav?: boolean;
    createdAt?: string;
}