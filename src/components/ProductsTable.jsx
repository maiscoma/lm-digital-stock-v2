// src/components/ProductsTable.jsx
"use client";

import { useProducts } from "@/hooks/useProducts";
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export const ProductsTable = () => {
    const { products, loading } = useProducts();

    if (loading) {
        return <p className="text-center text-text-secondary">Cargando productos...</p>;
    }

    return (
        <div className="overflow-x-auto bg-dark-card border border-dark-border rounded-lg">
            <table className="min-w-full text-sm text-left text-text-secondary">
                <thead className="text-xs uppercase bg-dark-bg text-text-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">SKU</th>
                        <th scope="col" className="px-6 py-3">Stock</th>
                        <th scope="col" className="px-6 py-3">Precio Venta</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b bg-dark-card border-dark-border hover:bg-gray-800">
                            <td className="px-6 py-4 font-medium text-text-primary">{product.name}</td>
                            <td className="px-6 py-4">{product.sku}</td>
                            <td className="px-6 py-4">{product.stock}</td>
                            <td className="px-6 py-4">${product.salePrice}</td>
                            <td className="flex items-center px-6 py-4 space-x-3">
                                <button className="font-medium text-blue-500 hover:underline"><FiEdit /></button>
                                <button className="font-medium text-red-500 hover:underline"><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};