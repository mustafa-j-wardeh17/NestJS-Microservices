import { Button } from "@/components/ui/button"
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
import { DeleteIcon, EditIcon } from "lucide-react"
import Image from "next/image"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default async function AdminPage() {
    const data = await fetch('http://localhost:8000/api/products', {
        method: 'GET'
    })
    const products = await data.json()
    return (
        <div className="w-full h-full flex flex-col px-[20px] pb-[60px]">
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
                    {products.map((product: AdminProduct) => (
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
                                <Button type="submit" variant={'destructive'} className="bg-blue-900 hover:bg-blue-950 duration-200 mr-2">
                                    <EditIcon />
                                </Button>
                                <Button variant={'destructive'}>
                                    <DeleteIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
