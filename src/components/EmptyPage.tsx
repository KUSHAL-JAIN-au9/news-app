import React from 'react';

interface EmptyPageProps {
    message?: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ message = "No data found" }) => {
    return (
        <div className="flex h-[60vh] flex-row justify-center items-center gap-8">
            <h1 className="text-2xl font-bold text-center">{message}</h1>
        </div>
    );
};

export default EmptyPage;