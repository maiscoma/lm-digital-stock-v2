// src/hooks/useProducts.js
"use client";

import { useState, useEffect } from 'react';
// Asegúrate de que 'where' esté importado aquí
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ESTA ES LA ÚNICA CONSULTA QUE NECESITAMOS
        // Incluye el filtro para no mostrar productos archivados.
        const q = query(
            collection(db, 'products'),
            where("status", "!=", "archived"), // Filtra los archivados
            orderBy('createdAt', 'desc')      // Ordena los restantes
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const productsData = [];
            querySnapshot.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productsData);
            setLoading(false);
        }, (error) => {
            console.error("Error al obtener los productos: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { products, loading };
};