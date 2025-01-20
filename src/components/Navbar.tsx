import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from './svg/Hamburger';
import { NavigationMenu } from '../constants';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hover:text-gray-100">News App</span>
                </Link>
                <button data-collapse-toggle="navbar-language" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <Hamburger />
                </button>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {NavigationMenu.map((menu, index) => (
                            <li key={index}>
                                <Link to={menu?.path} className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#009DE4] dark:text-white md:dark:hover:text-[#009DE4] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{menu.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;