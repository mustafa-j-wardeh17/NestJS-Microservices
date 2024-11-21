import LikeForm from "@/components/LikeForm";
import { MainProduct } from "@/types/types";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function MainPage() {
    try {
        const response = await fetch("http://localhost:8001/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products: MainProduct[] = await response.json();

        return (
            <div className="w-full h-full flex flex-col gap-5 px-5">
                <h1 className="font-bold">A list of your main MongoDB products</h1>

                <div className="flex justify-start flex-wrap gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="flex w-[200px] flex-col">
                                <div className="w-[200px] h-[180px] relative">
                                    <Image
                                        src={product.image}
                                        alt={`Product #${product._id}`}
                                        width={200}
                                        height={180}
                                        className="w-full h-full object-cover rounded-t-md"
                                    />
                                </div>
                                <div className="flex flex-col bg-muted px-2 py-3 gap-2 rounded-b-md">
                                    <h1 className="capitalize">{product.title}</h1>
                                    <div className="flex justify-between items-center">
                                        <LikeForm id={product.id} />
                                        <p className="text-sm text-secondary-foreground/50">
                                            <span>{product.likes}</span> likes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading products:", error);
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-error">Failed to load products. Please try again later.</p>
            </div>
        );
    }
}
