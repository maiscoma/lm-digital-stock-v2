// src/app/(main)/dashboard/page.jsx
"use client";

import { useState } from "react";
import { ProductsTable } from "@/components/ProductsTable"; // La tabla que crearemos
import { ProductForm } from "@/components/ProductForm";   // El formulario que crearemos
import { Button } from "@/components/ui/Button";
import { FiPlusCircle } from 'react-icons/fi';

export default function DashboardPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-text-primary">Inventario</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <FiPlusCircle />
                    Añadir Producto
                </Button>
            </div>

            <ProductsTable />

            {/* El formulario modal se mostrará cuando isModalOpen sea true */}
            <ProductForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}