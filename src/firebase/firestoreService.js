// src/firebase/firestoreService.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config'; // Importamos la instancia de la base de datos

/**
 * Añade un nuevo producto a la colección 'products'.
 * @param {object} productData - Los datos del producto a añadir.
 * @returns {Promise<DocumentReference>} La referencia al nuevo documento creado.
 */
export const addProduct = async (productData) => {
    try {
        // Referencia a la colección 'products'
        const productsCollection = collection(db, 'products');

        // Añadimos el nuevo documento, incluyendo una marca de tiempo del servidor
        const docRef = await addDoc(productsCollection, {
            ...productData,
            createdAt: serverTimestamp(), // Sello de tiempo de creación
            lastModified: serverTimestamp(), // Sello de tiempo de modificación
        });

        console.log("Producto añadido con ID: ", docRef.id);
        return docRef;
    } catch (error) {
        console.error("Error al añadir el producto: ", error);
        throw new Error("No se pudo añadir el producto.");
    }
};