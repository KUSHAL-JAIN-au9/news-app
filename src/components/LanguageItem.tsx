import React from 'react';

interface LanguageItemProps {
    href: string;
    SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ href, SvgComponent, label }) => {
    return (
        <li>
            <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                <div className="inline-flex items-center">
                    {/* <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#de2910" d={svgPath} />
                    </svg> */}
                    <SvgComponent className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" />
                    {/* <img className="h-3.5 w-3.5 rounded-full me-2" src={SvgComponent} alt={label} /> */}
                    {label}
                </div>
            </a>
        </li>
    );
};

export default LanguageItem;