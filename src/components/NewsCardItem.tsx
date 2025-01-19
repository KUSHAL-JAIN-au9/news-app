import React, { useState } from 'react';
import { truncateString } from '../utility';
import { Link } from 'react-router';
import { placeholderImage } from '../constants';

interface NewsCardItemProps {
    title: string;
    description: string;
    imageUrl: string;
    articleUrl: string;
}
const NewsCardItem: React.FC<NewsCardItemProps> = ({ title, description, imageUrl, articleUrl }) => {
    const [isImageBroken, setIsImageBroken] = useState(false);

    return (<div className="card card-compact mx-4 my-4 w-72 sm:w-96 overflow-hidden shadow-lg bg-gray-800 text-white dark:shadow-white dark:bg-gray-900">
        <figure>
            {!isImageBroken ? <img
                className='h-48 w-full object-cover'
                src={imageUrl || placeholderImage}
                alt={title}
                onError={() => setIsImageBroken(true)}
            /> : <div className="animate-pulse h-48 w-full bg-gray-200 rounded-lg"></div>}

        </figure>
        <div className="card-body">

            <h2 className="card-title" data-tooltip-id="my-tooltip" data-tip="Tooltip content">{truncateString(title, 50)}</h2>
            <p className='text-gray-400 text-base'>{truncateString(description, 30)}</p>
            <div className="card-actions justify-end">
                <Link to={articleUrl}>
                    <button className="btn btn-outline btn-info">Read More</button>
                </Link>
            </div>
        </div>
    </div>
    );
};

export default NewsCardItem;