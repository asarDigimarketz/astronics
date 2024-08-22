import React from 'react';
import "./loading.css"

const LoadingSkeleton = () => {
    return (
        <div className="container">


            <div className="animate-pulse space-y-4">
                <div className="flex flex-col md:flex-row">
                    {/* Image Placeholder */}
                    <div className="w-full md:w-1/2 h-48  rounded mb-4 md:mb-0 loading-skeleton-image"></div>

                    {/* Content Placeholder */}
                    <div className="space-y-2 w-full md:w-1/2 md:pl-8 loading-skeleton-content">
                        <div className="h-6  rounded w-1/2 loading-skeleton-line"></div>
                        <div className="h-4 rounded w-full loading-skeleton-line"></div>
                        <div className="h-4  rounded w-full loading-skeleton-line"></div>
                        <div className="h-4  rounded w-3/4 loading-skeleton-line"></div>
                        <div className="h-10  rounded w-32 mt-4 loading-skeleton-line"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;
