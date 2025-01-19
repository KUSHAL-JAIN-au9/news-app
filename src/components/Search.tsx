import React from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    query: string
    setQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = "Search...", query, setQuery }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <label className="input md:w-auto lg:w-[19rem] input-bordered  input-info flex flex-nowrap flex-row items-center justify-evenly">
            <input
                id='search'
                type="text"
                className="input  max-w-xs border-none"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
            </svg>
            <button
                className="btn btn-outline btn-accent  "
                onClick={handleSearch}
            >
                Search
            </button>
        </label>
    );
};

export default Search;
