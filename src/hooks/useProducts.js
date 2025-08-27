// src/hooks/useProducts.js
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/config';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Creamos una consulta a la colección 'products', ordenando por fecha de creación descendente
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

        // onSnapshot establece la escucha en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const productsData = [];
            querySnapshot.forEach((doc) => {
                // Extraemos los datos y añadimos el ID del documento, que es crucial
                productsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productsData);
            setLoading(false);
        }, (error) => {
            console.error("Error al obtener los productos: ", error);
            setLoading(false);
        });

        // Esta función se ejecuta cuando el componente se desmonta.
        // Es VITAL para limpiar la suscripción y evitar fugas de memoria.
        return () => unsubscribe();
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez

    return { products, loading };
};