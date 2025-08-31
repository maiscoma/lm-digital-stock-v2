// src/firebase/firestoreService.js
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from './config';


/**
 * Añade un nuevo producto a la colección 'products'.
 * @param {object} productData Los datos del producto.
 */
export const addProduct = async (productData) => {
    try {
        await addDoc(collection(db, 'products'), {
            ...productData,
            status: 'active', // Estado inicial por defecto
            createdAt: serverTimestamp(),
            lastModified: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error al añadir el producto: ", error);
        throw new Error("No se pudo añadir el producto.");
    }
};

/**
 * Actualiza un producto existente en la colección 'products'.
 * @param {string} productId - El ID del documento a actualizar.
 * @param {object} productData - Los nuevos datos del producto.
 * @returns {Promise<void>}
 */
export const updateProduct = async (productId, productData) => {
    try {
        // Creamos una referencia directa al documento del producto
        const productRef = doc(db, 'products', productId);

        // Actualizamos el documento con los nuevos datos y la fecha de modificación
        await updateDoc(productRef, {
            ...productData,
            lastModified: serverTimestamp(),
        });

        console.log("Producto actualizado con ID: ", productId);
    } catch (error) {
        console.error("Error al actualizar el producto: ", error);
        throw new Error("No se pudo actualizar el producto.");
    }
};
/**
 * Realiza un borrado lógico de un producto, marcándolo como 'archived'.
 * @param {string} productId - El ID del documento a archivar.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(db, 'products', productId);

        // En lugar de borrar, actualizamos el estado a 'archived'
        await updateDoc(productRef, {
            status: 'archived',
            lastModified: serverTimestamp(),
        });

        console.log("Producto archivado con ID: ", productId);
    } catch (error) {
        console.error("Error al archivar el producto: ", error);
        throw new Error("No se pudo archivar el producto.");
    }
};

// Aquí podrías añadir la función de transacción de stock que vimos la semana pasada
// export const handleStockMovement = async ({...}) => { ... };