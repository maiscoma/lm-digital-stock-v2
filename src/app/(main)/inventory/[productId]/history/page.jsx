// src/app/(main)/inventory/[productId]/history/page.jsx
"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { FiArrowLeft } from 'react-icons/fi';

// La exportación por defecto DEBE ser un componente de React
export default function HistoryPage({ params }) {
    const { productId } = params;
    const [movements, setMovements] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            const productRef = doc(db, 'products', productId);
            getDoc(productRef).then(docSnap => {
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                }
            });

            const q = query(
                collection(db, 'stockMovements'),
                where("productId", "==", productId),
                orderBy("timestamp", "desc")
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const movementsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMovements(movementsData);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [productId]);

    if (loading) return <p className="text-center text-text-secondary">Cargando historial...</p>;

    return (
        <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 mb-8 transition-colors text-primary-color hover:text-primary-dark">
                <FiArrowLeft />
                Volver al Inventario
            </Link>
            <h1 className="mt-4 text-3xl font-bold">
                Historial de Movimientos: <span className="text-primary-color">{product?.name}</span>
            </h1>

            <div className="mt-8 space-y-4">
                {movements.length > 0 ? movements.map(move => (
                    <div key={move.id} className="grid items-center grid-cols-1 gap-4 p-4 border rounded-lg md:grid-cols-4 bg-dark-card border-dark-border">
                        <div>
                            <p className="text-xs text-text-secondary">Tipo</p>
                            <p className={`font-bold ${move.type === 'entry' ? 'text-green-400' : 'text-red-400'}`}>
                                {move.type === 'entry' ? 'ENTRADA' : 'SALIDA'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary">Cantidad</p>
                            <p className="font-bold">{move.quantity}</p>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary">Motivo</p>
                            <p>{move.reason}</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-xs text-text-secondary">Fecha</p>
                            <p>{new Date(move.timestamp?.toDate()).toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                )) : <p className="text-text-secondary">No hay movimientos registrados para este producto.</p>}
            </div>
        </div>
    );
}