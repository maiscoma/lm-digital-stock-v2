// src/components/ProductForm.jsx
"use client";

import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "@/firebase/firestoreService";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { CgSpinner } from 'react-icons/cg';

export const ProductForm = ({ isOpen, onClose, productToEdit }) => {
    const [productData, setProductData] = useState({ name: '', sku: '', stock: 0, salePrice: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productToEdit) {
            // Si estamos editando, poblamos el formulario con los datos del producto
            setProductData(productToEdit);
        } else {
            // Si estamos creando, reseteamos el formulario
            setProductData({ name: '', sku: '', stock: 0, salePrice: '' });
        }
    }, [productToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!productData.name || !productData.sku) {
            setError("Nombre y SKU son campos obligatorios.");
            return;
        }

        // Limpiamos y validamos los datos numéricos
        const stockAsNumber = Number(productData.stock);
        const priceAsString = String(productData.salePrice);
        const cleanedPrice = priceAsString.replace(/\./g, ''); // Quitamos puntos de miles
        const priceAsNumber = Number(cleanedPrice);

        if (isNaN(stockAsNumber) || isNaN(priceAsNumber)) {
            setError("Stock y Precio deben ser números válidos.");
            return;
        }

        setLoading(true);
        try {
            const dataToSave = {
                name: productData.name,
                sku: productData.sku,
                stock: stockAsNumber,
                salePrice: priceAsNumber,
            };

            // Lógica condicional: si hay un producto para editar, actualiza. Si no, crea.
            if (productToEdit) {
                await updateProduct(productToEdit.id, dataToSave);
            } else {
                await addProduct(dataToSave);
            }
            onClose(); // Cierra el modal en caso de éxito
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
                    {productToEdit ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h2>
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
                        <label className="text-sm font-medium text-text-secondary">Stock</label>
                        <Input name="stock" type="number" value={productData.stock} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-secondary">Precio de Venta</label>
                        <Input name="salePrice" type="text" inputMode="numeric" pattern="[0-9.]*" value={productData.salePrice} onChange={handleChange} required />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <CgSpinner className="animate-spin" />
                                    Guardando...
                                </span>
                            ) : (
                                productToEdit ? 'Actualizar Producto' : 'Guardar Producto'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};