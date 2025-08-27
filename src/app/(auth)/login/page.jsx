// src/app/(auth)/login/page.jsx
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            {/* Usamos las clases personalizadas que coinciden con el .css */}
            <div className="w-full max-w-sm p-8 space-y-6 border rounded-xl shadow-lg bg-dark-card border-dark-border">
                <div className="flex justify-center">
                    <Image
                        src="/logo.png" // Asegúrate de tener el logo con letras blancas en /public
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

                <form className="space-y-6">
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
                        />
                    </div>

                    <div>
                        {/* Replicamos el botón con gradiente y sombra de resplandor del .css [cite: 1] */}
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