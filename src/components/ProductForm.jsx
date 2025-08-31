// src/components/ProductForm.jsx
"use client";

import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "@/firebase/firestoreService";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { CgSpinner } from 'react-icons/cg';

// Definimos un estado inicial vacío para reutilizarlo
const EMPTY_PRODUCT_STATE = { name: '', sku: '', stock: 0, salePrice: '' };

export const ProductForm = ({ isOpen, onClose, initialData = null }) => {
    const [formData, setFormData] = useState(EMPTY_PRODUCT_STATE);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isEditMode = initialData !== null;

    useEffect(() => {
        if (isOpen) {
            // AQUÍ ESTÁ LA CORRECCIÓN:
            // Nos aseguramos de que initialData sea un objeto antes de usarlo.
            // Si es null o undefined, usamos el estado vacío.
            setFormData(initialData ? initialData : EMPTY_PRODUCT_STATE);
            setError('');
        }
    }, [isOpen, initialData]); // El dependency array se puede simplificar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Limpiamos y validamos los datos numéricos
        const stockAsNumber = Number(formData.stock);
        const priceAsString = String(formData.salePrice);
        const cleanedPrice = priceAsString.replace(/\./g, '');
        const priceAsNumber = Number(cleanedPrice);

        if (isNaN(stockAsNumber) || isNaN(priceAsNumber)) {
            setError("Stock y Precio deben ser números válidos.");
            return;
        }

        setLoading(true);
        try {
            const dataToSave = {
                name: formData.name,
                sku: formData.sku,
                stock: stockAsNumber,
                salePrice: priceAsNumber,
                status: 'active',
            };

            if (isEditMode) {
                await updateProduct(initialData.id, dataToSave);
            } else {
                await addProduct(dataToSave);
            }
            onClose();
        } catch (err) {
            setError("Ocurrió un error al guardar el producto.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-lg p-8 space-y-6 border rounded-xl shadow-lg bg-dark-card border-dark-border">
                <h2 className="text-2xl font-bold text-center text-text-primary">
                    {isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Los inputs usan formData, que ahora está garantizado que es un objeto */}
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Nombre del Producto</label>
                        <Input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">SKU</label>
                        <Input name="sku" value={formData.sku} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Stock</label>
                        <Input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Precio de Venta</label>
                        <Input name="salePrice" type="text" inputMode="numeric" value={formData.salePrice} onChange={handleChange} required />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2"><CgSpinner className="animate-spin" /> Guardando...</span>
                            ) : (
                                isEditMode ? 'Guardar Cambios' : 'Crear Producto'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};