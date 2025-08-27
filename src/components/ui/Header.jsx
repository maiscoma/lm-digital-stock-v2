// src/components/ui/Header.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { signOutUser } from "@/firebase/authService";
import { useRouter } from "next/navigation";
import { Button } from "./Button"; // Importamos nuestro botón reutilizable

export const Header = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOutUser();
            // El AuthContext se encargará de la redirección, pero por si acaso:
            router.push('/login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
            alert("Hubo un error al cerrar la sesión.");
        }
    };

    return (
        <header className="w-full p-4 border-b bg-dark-card border-dark-border">
            <div className="container flex items-center justify-between mx-auto">
                <div>
                    {/* Mostramos el correo del usuario si está logueado */}
                    {user && <span className="text-sm text-text-secondary">Hola, {user.email}</span>}
                </div>
                <div>
                    {user && (
                        <Button variant="secondary" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};