// src/app/(main)/layout.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Componentes de la UI (los crearemos más adelante)
// const Sidebar = () => <div className="w-64 bg-dark-card p-4">Sidebar</div>;
// const Header = () => <header className="bg-dark-card p-4">Header</header>;

export default function MainLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Si la carga ha terminado y no hay usuario, redirigir al login.
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Mientras carga, no mostramos nada para evitar un parpadeo de la página protegida.
    if (loading || !user) {
        return null; // O un componente de Spinner/Cargando
    }

    // Si el usuario está autenticado, muestra el layout y la página.
    return (
        <div className="flex h-screen bg-dark-bg text-text-primary">
            {/* <Sidebar /> */}
            <main className="flex-1 flex flex-col">
                {/* <Header /> */}
                <div className="p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}