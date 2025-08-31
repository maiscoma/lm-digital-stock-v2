// src/app/(main)/dashboard/page.jsx
"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductsTable } from "@/components/ProductsTable";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/Button";
import { FiPlusCircle } from 'react-icons/fi';

export default function DashboardPage() {
    // Estados para controlar los modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    // Estado para guardar el producto que se va a editar
    const [productToEdit, setProductToEdit] = useState(null);

    // Lógica de búsqueda y filtrado
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // Función para abrir el modal en modo "Crear"
    const handleAddClick = () => {
        setProductToEdit(null); // Nos aseguramos de que no haya ningún producto para editar
        setIsFormModalOpen(true);
    };

    // Función para abrir el modal en modo "Editar"
    const handleEditClick = (product) => {
        setProductToEdit(product); // Guardamos el producto que queremos editar
        setIsFormModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsFormModalOpen(false);
        setProductToEdit(null); // Limpiamos el producto a editar al cerrar
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Inventario</h1>
                <Button onClick={handleAddClick}>
                    <FiPlusCircle size={18} />
                    Añadir Producto
                </Button>
            </div>

            {/* Barra de Búsqueda */}
            <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full max-w-md px-4 py-2 mb-6 text-white placeholder-gray-500 bg-dark-bg border rounded-lg border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-color"
            />

            {/* Pasamos la lista filtrada y las funciones a la tabla */}
            <ProductsTable
                products={filteredProducts}
                loading={loading}
                onEdit={handleEditClick} // Pasamos la función para manejar la edición
            />

            {/* El formulario ahora recibe el producto a editar */}
            <ProductForm
                isOpen={isFormModalOpen}
                onClose={handleCloseModal}
                productToEdit={productToEdit}
            />
        </div>
    );
}