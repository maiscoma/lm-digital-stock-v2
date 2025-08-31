// src/components/ProductsTable.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiMove, FiClipboard } from 'react-icons/fi';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { archiveProduct } from '@/firebase/firestoreService';

// 1. Asegúrate de que la firma del componente reciba TODAS las props necesarias
export const ProductsTable = ({ products, loading, onEdit, onDelete, onAddMovement }) => {

    // La lógica del modal de confirmación se queda aquí, pero usa la prop onDelete
    // que viene del Dashboard para la acción final.
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            setIsDeleting(true);
            try {
                await archiveProduct(productToDelete.id);
            } catch (error) {
                console.error("Error al archivar el producto", error);
                alert("No se pudo archivar el producto.");
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            }
        }
    };

    if (loading) {
        return <p className="text-center text-text-secondary">Cargando productos...</p>;
    }

    if (!products || products.length === 0) {
        return <p className="text-center text-text-secondary">No se encontraron productos.</p>;
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
                                    <button onClick={() => onEdit(product)} className="text-lg text-blue-500 transition-transform duration-200 hover:scale-125">
                                        <FiEdit />
                                    </button>
                                    {/* 2. El botón de eliminar ahora llama a la función local que abre el modal */}
                                    <button onClick={() => openDeleteModal(product)} className="text-lg text-red-500 transition-transform duration-200 hover:scale-125">
                                        <FiTrash2 />
                                    </button>
                                    <button onClick={() => onAddMovement(product)} className="text-lg text-green-500 transition-transform duration-200 hover:scale-125">
                                        <FiMove />
                                    </button>
                                    <Link href={`/inventory/${product.id}/history`} className="text-lg text-gray-400 transition-transform duration-200 hover:scale-125">
                                        <FiClipboard />
                                    </Link>
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
                isLoading={isDeleting}
            />
        </>
    );
};