// src/components/StockMovementModal.jsx
"use client";

import { useState } from "react";
import { handleStockMovement } from "@/firebase/firestoreService";
import { useAuth } from "@/context/AuthContext";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { CgSpinner } from 'react-icons/cg';

export const StockMovementModal = ({ isOpen, onClose, product }) => {
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState('Venta'); // Valor por defecto
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (type) => {
        if (!reason || !quantity || quantity <= 0) {
            setError("La cantidad debe ser mayor a 0 y el motivo es obligatorio.");
            return;
        }

        setLoading(true);
        setError('');
        try {
            await handleStockMovement({
                productId: product.id,
                userId: user.uid,
                type,
                quantity: Number(quantity),
                reason,
            });
            onClose();
            setQuantity(1);
            setReason('Venta');
        } catch (err) {
            setError(err.message); // Muestra errores de la transacción (ej. "Stock insuficiente")
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-lg p-8 space-y-6 border rounded-xl shadow-lg bg-dark-card border-dark-border">
                <h2 className="text-2xl font-bold text-center text-text-primary">
                    Registrar Movimiento para: <span className="text-primary-color">{product?.name}</span>
                </h2>

                <div>
                    <label className="text-sm font-medium text-text-secondary">Cantidad</label>
                    <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
                </div>
                <div>
                    <label className="text-sm font-medium text-text-secondary">Motivo del Movimiento</label>
                    {/* Usamos un <select> para estandarizar los motivos */}
                    <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="block w-full px-4 py-3 mt-2 text-white placeholder-gray-500 transition duration-200 ease-in-out border rounded-lg shadow-sm bg-dark-bg border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-color"
                    >
                        <option>Venta</option>
                        <option>Compra a proveedor</option>
                        <option>Ajuste por merma</option>
                        <option>Ajuste por inventario</option>
                        <option>Devolución</option>
                    </select>
                </div>

                {error && <p className="text-sm text-center text-red-500">{error}</p>}

                <div className="flex justify-between gap-4 pt-4">
                    <Button onClick={() => handleSubmit('entry')} disabled={loading} className="w-full">
                        {loading ? <CgSpinner className="animate-spin" /> : 'Registrar Entrada'}
                    </Button>
                    <Button onClick={() => handleSubmit('exit')} disabled={loading} variant="secondary" className="w-full !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white">
                        {loading ? <CgSpinner className="animate-spin" /> : 'Registrar Salida'}
                    </Button>
                </div>
                <Button variant="secondary" onClick={onClose} className="w-full mt-2">Cancelar</Button>
            </div>
        </div>
    );
};