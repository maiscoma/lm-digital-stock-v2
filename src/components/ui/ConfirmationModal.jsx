// src/components/ui/ConfirmationModal.jsx
"use client";

import { Button } from "./Button";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="w-full max-w-md p-6 space-y-4 border rounded-lg shadow-lg bg-dark-card border-dark-border">
                <h3 className="text-xl font-bold text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary">{message}</p>
                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancelar</Button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 bg-red-600 border border-transparent rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Confirmando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};