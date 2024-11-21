export interface AdminProduct {
    id: number;
    title: string;
    image: string;
    likes: number
}
export interface MainProduct extends AdminProduct {
    _id: string
}


export interface createProduct {
    title: string;
    image: string;
}