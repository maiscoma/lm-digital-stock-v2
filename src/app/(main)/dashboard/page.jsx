// src/app/(main)/dashboard/page.jsx
"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductsTable } from "@/components/ProductsTable";
import { ProductForm } from "@/components/ProductForm";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { StockMovementModal } from "@/components/StockMovementModal";
import { archiveProduct } from "@/firebase/firestoreService";
import { Button } from "@/components/ui/Button";
import { FiPlusCircle } from 'react-icons/fi';

export default function DashboardPage() {
    const { products, loading } = useProducts();

    // Estados para la UI
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);

    // Estados para la lógica
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productForMovement, setProductForMovement] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Lógica de filtrado (esto está perfecto)
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // --- MANEJADORES DE EVENTOS ---

    const handleAdd = () => {
        setProductToEdit(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
        setIsFormModalOpen(true);
    };

    // LÓGICA DE ELIMINACIÓN QUE FALTABA
    const handleDelete = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            setIsDeleting(true);
            try {
                await archiveProduct(productToDelete.id);
            } catch (error) {
                console.error("Error al archivar", error);
            } finally {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            }
        }
    };

    // LÓGICA PARA EL MODAL DE MOVIMIENTOS
    const handleOpenMovementModal = (product) => {
        setProductForMovement(product);
        setIsMovementModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Inventario</h1>
                <Button onClick={handleAdd}><FiPlusCircle size={18} />Añadir Producto</Button>
            </div>

            <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full max-w-md px-4 py-2 mb-6 text-white placeholder-gray-500 bg-dark-bg border rounded-lg border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-color"
            />

            {/* Le pasamos TODAS las funciones necesarias a la tabla */}
            <ProductsTable
                products={filteredProducts}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddMovement={handleOpenMovementModal}
            />

            {/* --- RENDERIZADO DE TODOS LOS MODALES --- */}

            <ProductForm
                isOpen={isFormModalOpen}
                onClose={() => {
                    setIsFormModalOpen(false);
                    setProductToEdit(null);
                }}
                initialData={productToEdit}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirmar Archivamiento"
                message={`¿Estás seguro de que quieres archivar el producto "${productToDelete?.name}"?`}
                isLoading={isDeleting}
            />

            <StockMovementModal
                isOpen={isMovementModalOpen}
                onClose={() => setIsMovementModalOpen(false)}
                product={productForMovement}
            />
        </div>
    );
}