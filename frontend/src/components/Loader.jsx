import React from 'react';

const Loader = ({ size = "md" }) => {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4"
    };

    return (
        <div className="flex justify-center items-center py-12">
            <div className={`${sizeClasses[size]} border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}></div>
        </div>
    );
};

export default Loader;
