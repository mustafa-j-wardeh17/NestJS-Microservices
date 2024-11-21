'use server';

import { redirect } from "next/navigation";

export const deleteProduct = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete product with id=${id}: ${res.statusText}`);
        }

        console.log(`Product with id=${id} successfully deleted.`);
        redirect('/admin')
    } catch (error: any) {
        throw error;
    }
};


export const createProduct = async (data: any) => {
    try {
        const res = await fetch('http://localhost:8000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Failed to create product: ${res.statusText}`);
        }

        const newProduct = await res.json();
        console.log('Product created successfully:', newProduct);
        redirect('/admin')
    } catch (error: any) {
        throw error;
    }
};

export const updateProduct = async (id: number, data: any) => {
    try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Failed to update product with id=${id}: ${res.statusText}`);
        }

        const updatedProduct = await res.json();
        console.log('Product updated successfully:', updatedProduct);
        redirect('/admin')
    } catch (error: any) {
        console.error('Error updating product:', error.message);
    }
};


export const MainLike = async (id: number) => {
    try {
        const likeResponse = await fetch(
            `http://localhost:8001/api/products/${id}/like`,
            {
                method: "POST",
            }
        );

        if (!likeResponse.ok) {
            throw new Error(
                `Failed to like product #${id}`
            );
        }

        redirect('/main')
    } catch (error) {
        console.error(error);
    }
}