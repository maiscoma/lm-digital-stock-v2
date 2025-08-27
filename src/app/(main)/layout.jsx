// src/app/(main)/layout.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/ui/Header"; // Importamos el Header

// const Sidebar = () => <div className="w-64 bg-dark-card p-4">Sidebar</div>;

export default function MainLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="flex items-center justify-center h-screen bg-dark-bg"><p>Cargando...</p></div>;
    }

    return (
        <div className="flex h-screen bg-dark-bg text-text-primary">
            {/* <Sidebar /> */}
            <main className="flex-1 flex flex-col">
                <Header /> {/* Añadimos el Header aquí */}
                <div className="p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}