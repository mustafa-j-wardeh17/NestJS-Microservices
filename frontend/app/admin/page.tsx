import AdminActions from "@/components/AdminActions"
import CreateForm from "@/components/CreateForm"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AdminProduct } from "@/types/types"
import Image from "next/image"

export default async function AdminPage() {
    try {
        const response = await fetch('http://localhost:8000/api/products', {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const products: AdminProduct[] = await response.json()
        return (
            <div className="w-full h-full flex flex-col gap-3 px-[20px] pb-[60px]">
                <CreateForm />
                <Table>
                    <TableCaption>A list of your admin posgtreSQL DB products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Likes</TableHead>
                            <TableHead >Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length > 0 && products.map((product: AdminProduct) => (
                            <TableRow key={product.id}>
                                <TableCell >
                                    <Image src={product.image}
                                        alt={`Admin Image Product #${product.id}`}
                                        width={120}
                                        height={80}
                                        className="object-cover rounded-md aspect-square"
                                    />
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.likes}</TableCell>
                                <TableCell className=" items-center">
                                    <AdminActions
                                        product={product}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    } catch (error) {
        console.error("Error loading products:", error);
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-error">Failed to load products. Please try again later.</p>
            </div>
        );
    }
}
