// src/components/ProductsTable.jsx
"use client";

import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { deleteProduct } from '@/firebase/firestoreService';

// 1. El componente ahora ACEPTA la lista de productos y las funciones como props.
export const ProductsTable = ({ products, loading, onEdit }) => {
    // 2. LA LÓGICA PARA BUSCAR PRODUCTOS YA NO ESTÁ AQUÍ.
    // const { products, loading } = useProducts(); <-- SE ELIMINA ESTA LÍNEA

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete.id);
            } catch (error) {
                console.error("Error al archivar el producto", error);
                alert("No se pudo archivar el producto.");
            } finally {
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            }
        }
    };

    if (loading) {
        return <p className="text-center text-text-secondary">Cargando productos...</p>;
    }

    return (
        <>
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
                                <td className="px-6 py-4">
                                    {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.salePrice)}
                                </td>
                                <td className="flex items-center px-6 py-4 space-x-4">
                                    {/* 3. CONECTAMOS EL EVENTO ONCLICK DEL BOTÓN DE EDITAR */}
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="text-lg text-blue-500 transition-transform duration-200 hover:scale-125"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product)}
                                        className="text-lg text-red-500 transition-transform duration-200 hover:scale-125"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirmar Archivamiento"
                message={`¿Estás seguro de que quieres archivar el producto "${productToDelete?.name}"?`}
            />
        </>
    );
};