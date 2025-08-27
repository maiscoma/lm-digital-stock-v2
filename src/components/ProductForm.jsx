// src/components/ProductForm.jsx
"use client";

import { useState } from "react";
import { addProduct } from "@/firebase/firestoreService";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

export const ProductForm = ({ isOpen, onClose }) => {
    // Estado para cada campo del formulario
    const [productData, setProductData] = useState({
        name: '',
        sku: '',
        stock: 0,
        salePrice: 0,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Manejador para actualizar el estado cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validación básica
        if (!productData.name || !productData.sku) {
            setError("Nombre y SKU son campos obligatorios.");
            return;
        }
        if (isNaN(productData.stock) || isNaN(productData.salePrice)) {
            setError("Stock y Precio deben ser números.");
            return;
        }

        setLoading(true);
        try {
            // Llamamos a nuestra función de servicio para añadir el producto
            await addProduct({
                ...productData,
                stock: Number(productData.stock), // Aseguramos que sean números
                salePrice: Number(productData.salePrice),
            });
            onClose(); // Cerramos el modal si todo fue exitoso
            setProductData({ name: '', sku: '', stock: 0, salePrice: 0 }); // Reseteamos el formulario
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        // Fondo oscuro semi-transparente para el modal (overlay)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            {/* Contenedor del modal */}
            <div className="w-full max-w-lg p-8 space-y-6 border rounded-xl shadow-lg bg-dark-card border-dark-border">
                <h2 className="text-2xl font-bold text-center text-text-primary">Añadir Nuevo Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Nombre del Producto</label>
                        <Input name="name" value={productData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">SKU</label>
                        <Input name="sku" value={productData.sku} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Stock Inicial</label>
                        <Input name="stock" type="number" value={productData.stock} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Precio de Venta</label>
                        <Input name="salePrice" type="number" value={productData.salePrice} onChange={handleChange} required />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="secondary" onClick={onClose} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar Producto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};