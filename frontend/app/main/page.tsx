import { Button } from "@/components/ui/button"
import { MainProduct } from "@/types/types"

import Image from "next/image"


export default async function MainPage() {
    const data = await fetch('http://localhost:8001/api/products', {
        method: 'GET'
    })
    const products = await data.json()
    return (
        <div className="w-full h-full flex flex-col gap-[20px] px-[20px]">
            <h1 className="font-bold">A list of your main MongoDB products.</h1>

            <div className="flex justify-start flex-wrap gap-4">
                {products.length > 0 && products.map((product: MainProduct) => (
                    <div
                        key={product._id}
                        className="flex w-[200px] flex-col "
                    >
                        <div className="w-[200px] h-[180px] relative">
                            <Image
                                src={'https://img.freepik.com/premium-photo/flip-mobile-isolated-back-left-view-white-background_187299-23546.jpg?w=996'}
                                alt={`Admin Image Product #${product._id}`}
                                fill
                                className="object-fill rounded-t-md aspect-square"
                            />
                        </div>
                        <div className="flex flex-col bg-muted px-2 py-3 gap-2 rounded-b-md">
                            <h1 className="capitalize">{product.title}</h1>

                            <div className="flex justify-between items-center">
                                <button
                                    className="text-sm border py-1 px-2 rounded-md bg-muted-foreground/30 hover:bg-muted-foreground/10 duration-200"
                                >
                                    Like
                                </button>
                                <p className="text-sm text-secondary-foreground/50"><span>{product.likes}</span> likes</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
