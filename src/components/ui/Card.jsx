// src/components/ui/Card.jsx
export const Card = ({ children, className = '' }) => {
    return (
        // Replicamos el estilo de las tarjetas de la sección "Services" del CSS
        <div
            className={`bg-dark-card p-6 border border-dark-border rounded-xl transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:border-primary-color hover:shadow-glow ${className}`}
        >
            {children}
        </div>
    );
};