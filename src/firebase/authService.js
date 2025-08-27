// src/firebase/authService.js
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import app from './config'; // Importamos nuestra configuración inicial de Firebase

// Obtenemos la instancia de autenticación
const auth = getAuth(app);

/**
 * Registra un nuevo usuario con correo y contraseña.
 * @param {string} email - El correo del nuevo usuario.
 * @param {string} password - La contraseña del nuevo usuario.
 * @returns {Promise<UserCredential>} El objeto de credenciales del usuario.
 */
export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Podríamos agregar lógica adicional aquí, como guardar el usuario en Firestore.
        return userCredential;
    } catch (error) {
        // Manejo de errores específico de Firebase (ej. email ya en uso)
        console.error("Error en el registro:", error.code, error.message);
        throw error;
    }
};

/**
 * Inicia sesión de un usuario con correo y contraseña.
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<UserCredential>} El objeto de credenciales del usuario.
 */
export const signInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error("Error en el inicio de sesión:", error.code, error.message);
        throw error;
    }
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error al cerrar sesión:", error.code, error.message);
        throw error;
    }
};