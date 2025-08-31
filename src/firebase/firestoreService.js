// src/firebase/firestoreService.js
import { collection, addDoc, serverTimestamp, doc, updateDoc, runTransaction } from 'firebase/firestore';
import { db } from './config';

/**
 * Añade un nuevo producto a la colección 'products'.
 * @param {object} productData Los datos del producto.
 */
export const addProduct = async (productData) => {
    // ... (el código de esta función está bien, no necesita cambios)
    try {
        await addDoc(collection(db, 'products'), {
            ...productData,
            status: 'active',
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
 */
export const updateProduct = async (productId, productData) => {
    // ... (el código de esta función está bien, no necesita cambios)
    try {
        const productRef = doc(db, 'products', productId);
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
 */
// ¡AQUÍ ESTÁ LA CORRECCIÓN! Renombramos la función a 'archiveProduct'
export const archiveProduct = async (productId) => {
    try {
        const productRef = doc(db, 'products', productId);
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

/**
 * Registra un movimiento de stock y actualiza la cantidad del producto de forma atómica.
 * @param {object} data - Contiene productId, type, quantity, reason, y userId.
 */
export const handleStockMovement = async ({ productId, type, quantity, reason, userId }) => {
    // ... (el código de esta función está bien, no necesita cambios)
    if (!productId || !type || !quantity || !reason || !userId) {
        throw new Error("Todos los campos son obligatorios para el movimiento de stock.");
    }
    const productRef = doc(db, 'products', productId);
    try {
        await runTransaction(db, async (transaction) => {
            const productDoc = await transaction.get(productRef);
            if (!productDoc.exists()) {
                throw "El producto no existe.";
            }
            const currentStock = productDoc.data().stock;
            const newStock = type === 'entry' ? currentStock + quantity : currentStock - quantity;
            if (newStock < 0) {
                throw "Stock insuficiente para realizar la salida.";
            }
            transaction.update(productRef, {
                stock: newStock,
                lastModified: serverTimestamp()
            });
            const movementRef = doc(collection(db, "stockMovements"));
            transaction.set(movementRef, {
                productId,
                userId,
                type,
                quantity,
                reason,
                previousStock: currentStock,
                newStock,
                timestamp: serverTimestamp()
            });
        });
        console.log("Transacción de stock completada con éxito.");
    } catch (error) {
        console.error("Error en la transacción de stock: ", error);
        throw error;
    }
};