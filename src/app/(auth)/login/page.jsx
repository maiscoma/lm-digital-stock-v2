// src/app/(auth)/login/page.jsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { signInWithEmail } from '@/firebase/authService'; // Usamos nuestro servicio centralizado
import { useRouter } from 'next/navigation'; // Importamos el router para redirigir

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Inicializamos el router

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmail(email, password);
            // Si el inicio de sesión es exitoso, Firebase se encargará de actualizar el AuthContext.
            // Y nuestro layout protegido nos redirigirá automáticamente. Por ahora, lo hacemos manualmente.
            alert('¡Inicio de sesión exitoso!');
            router.push('/'); // Redirigir a la página principal (o al dashboard en el futuro)
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("Correo o contraseña incorrectos.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm p-8 space-y-6 border rounded-xl shadow-lg bg-dark-card border-dark-border">
                <div className="flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Logo LM Labor Soft"
                        width={120}
                        height={120}
                        priority
                    />
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-text-primary">
                        Bienvenido
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                        Inicia sesión para acceder a la plataforma
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email-address" className="text-sm font-medium text-text-secondary">
                            Correo Electrónico
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            className="block w-full px-4 py-3 mt-2 placeholder-gray-500 transition duration-200 ease-in-out border rounded-lg shadow-sm bg-dark-bg border-dark-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent sm:text-sm"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full px-4 py-3 mt-2 placeholder-gray-500 transition duration-200 ease-in-out border rounded-lg shadow-sm bg-dark-bg border-dark-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent sm:text-sm"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-3 mt-4 text-sm font-semibold text-white transition-transform duration-200 ease-in-out border border-transparent rounded-lg shadow-lg from-primary-color to-primary-dark bg-gradient-to-r hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color focus:ring-offset-dark-card"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}