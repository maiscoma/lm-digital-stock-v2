// src/app/(auth)/register/page.jsx
"use client";

import Image from 'next/image';
import Link from 'next/link'; // Usamos Link para la navegación
import { useState } from 'react';
import { signUpWithEmail } from '@/firebase/authService'; // Importamos la función de registro
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signUpWithEmail(email, password);
            // Aquí podríamos añadir lógica para guardar el nombre del usuario en Firestore.
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            router.push('/login'); // Redirigir al login después del registro
        } catch (error) {
            console.error("Error en el registro:", error);
            // Firebase nos da códigos de error útiles
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo electrónico ya está en uso.');
            } else if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else {
                setError('Ocurrió un error al intentar registrar la cuenta.');
            }
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
                        Crear Cuenta
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                        Únete a la plataforma Digital Stock
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-text-secondary">
                            Nombre Completo
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="block w-full px-4 py-3 mt-2 placeholder-gray-500 transition duration-200 ease-in-out border rounded-lg shadow-sm bg-dark-bg border-dark-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent sm:text-sm"
                            placeholder="Tu nombre y apellido"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                            minLength="6"
                            className="block w-full px-4 py-3 mt-2 placeholder-gray-500 transition duration-200 ease-in-out border rounded-lg shadow-sm bg-dark-bg border-dark-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent sm:text-sm"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-center text-red-500">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-3 mt-2 text-sm font-semibold text-white transition-transform duration-200 ease-in-out border border-transparent rounded-lg shadow-lg from-primary-color to-primary-dark bg-gradient-to-r hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color focus:ring-offset-dark-card"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>

                <p className="text-sm text-center text-text-secondary">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="font-medium transition-colors text-primary-color hover:text-primary-dark">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}