'use client'
import React from 'react'
import { Button } from './ui/button'
import { DeleteIcon, EditIcon } from 'lucide-react'
import { AdminProduct } from '@/types/types';
import { deleteProduct } from '@/app/actions/adminActions';

const AdminActions = ({ product }: { product: AdminProduct }) => {
    const handleDelete = async () => {
        deleteProduct(product.id)
    }
    const handleEdit = async () => {
        console.log(`product with id=${product.id} has been edited successfully`)
    }
    return (
        <>
            <Button
                onClick={handleEdit}
                className="bg-blue-900 text-white hover:bg-blue-950 duration-200 mr-2"
            >
                <EditIcon />
            </Button>
            <Button
                onClick={handleDelete}
                className="bg-red-900 hover:bg-red-950 text-white duration-200 mr-2"
            >
                <DeleteIcon />
            </Button>
        </>
    )
}

export default AdminActions