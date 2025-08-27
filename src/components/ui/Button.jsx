// src/components/ui/Button.jsx
export const Button = ({ children, variant = 'primary', type = 'button', ...props }) => {
    // Definimos los estilos base que ambos botones comparten
    const baseStyles = "inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-semibold text-sm cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105";

    // Definimos los estilos específicos para cada variante
    const variantStyles = {
        primary: "text-white border-transparent from-primary-color to-primary-dark bg-gradient-to-r shadow-lg hover:shadow-glow",
        secondary: "bg-transparent text-text-primary border-2 border-primary-color hover:bg-primary-color hover:text-dark-bg",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variantStyles[variant]}`}
            {...props}
        >
            {children}
        </button>
    );
};