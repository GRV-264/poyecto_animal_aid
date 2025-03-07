import React from 'react';
import Select from 'react-select';

const MapThemeSelector = ({ selectedTheme, onChange }) => {
    const options = [
        { value: '', label: 'Select Map Theme', isDisabled: true }, // Elemento de título deshabilitado
        { value: 'default', label: 'Default' },
        { value: 'silver', label: 'Silver' },
        { value: 'night', label: 'Night' },
        { value: 'retro', label: 'Retro' },
        { value: 'hiding', label: 'Hiding' }
    ];

    return (
        <div className="w-48"> {/* Establece un ancho fijo para el selector */}
            <Select
                options={options}
                value={options.find(option => option.value === selectedTheme)}
                onChange={onChange}
                placeholder="Select map theme"
                className="text-lg font-bold text-gray-900" // Aplicar clases de Tailwind CSS
                menuPlacement="top" // Establecer el menuPlacement en 'top'
            />
        </div>
    );
}

export default MapThemeSelector;




