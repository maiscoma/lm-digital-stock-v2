// src/components/ui/Input.jsx
export const Input = ({ id, name, type = 'text', placeholder, required = false, ...props }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            // Replicamos el estilo "Dark Tech" del archivo CSS
            className="block w-full px-4 py-3 text-white placeholder-gray-500 transition duration-200 ease-in-out bg-dark-bg border border-dark-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent sm:text-sm"
            {...props}
        />
    );
};