'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon, Printer } from 'lucide-react';
import { createProduct } from '@/app/actions/adminActions';

const CreateForm = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            createProduct(formData)
            setShow(false); // Hide the modal after successful submission
            setFormData({
                title: '',
                image: ''
            })
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full mt-[30px]">
            <div className="flex items-center justify-between">
                <Button
                    className="bg-blue-500 hover:bg-blue-600 duration-200"
                    onClick={() => setShow(true)}
                >
                    <PlusIcon /> New
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 duration-200">
                    <Printer /> PDF
                </Button>
            </div>

            {show && (
                <div className="fixed z-10 right-0 top-0 w-screen h-screen bg-black/20 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
                        <h2 className="text-lg font-bold mb-4">Create New Product</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Product Title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="border rounded-md p-2"
                                required
                            />

                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="border rounded-md p-2"
                            />

                            <div className="flex justify-between mt-4">
                                <Button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => setShow(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateForm;
