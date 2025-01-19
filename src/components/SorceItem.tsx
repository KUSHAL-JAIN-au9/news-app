import React from 'react';
import { Link } from 'react-router';

interface SourceItemProps {
    name: string;
    description: string;
    url: string;
    path: string;
}

const SourceItem: React.FC<SourceItemProps> = ({ name, description, path, url }) => {
    return (
        <Link to={path}>
            <div className="card cursor-pointer image-full w-60 shadow-xl h-60 overflow-hidden  bg-gray-800 text-white dark:shadow-white dark:bg-gray-900 transform transition-transform duration-300 hover:scale-105">
                <figure>
                    <img
                        className=' w-full h-48'
                        src={url}
                        alt={name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-white">{name}</h2>
                    <p className='text-gray-400'>{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-accent">Read More</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SourceItem;