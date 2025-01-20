import React from 'react';
import { formatDate, truncateString } from '../utility';

interface SelectOptionProps {
    id: number;
    options: string[];
    onChange: (selectedOption: { name: string; value: string }) => void;
    defaultValue?: string;
    name: string,
    value: string,
    isDate?: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({ options, onChange, name, defaultValue, value, isDate = false, id }) => {
    return (
        <div className="w-full max-w-xs">
            <select
                className="select select-accent w-full select-filters"
                id={`select-filters-${id}`}
                value={value}
                defaultValue={defaultValue}
                name={name}
                onChange={(e) => onChange(e.target)}
            >
                <option disabled selected value={`Select a ${name}`} >
                    {`Select a ${name}`}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {isDate ? formatDate(option) : truncateString(option, 30)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectOption;