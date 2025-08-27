// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos un hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 3. Creamos el Componente Proveedor
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged es un "oyente" de Firebase que se activa
        // cada vez que el estado de autenticación cambia (login/logout).
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario ha iniciado sesión
                setUser(user);
            } else {
                // El usuario ha cerrado sesión
                setUser(null);
            }
            setLoading(false);
        });

        // Limpiamos el "oyente" cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    const value = { user, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};