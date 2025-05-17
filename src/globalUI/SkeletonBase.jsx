import React from 'react';
import './SkeletonStyles.css';

const SkeletonBase = ( {children, width = '100%', height = '1rem'} ) => (
    <div className="skeleton-wrapper" style={{width, height}}>
        {children}
    </div>
);

export const SkeletonLine = ( {width = '100%', height = '16px'} ) => (
    <div className="skeleton-line" style={{width, height}} />
);

export const SkeletonBox = ( {width = '100px', height = '100px'} ) => (
    <div className="skeleton-box" style={{width, height}} />
);

export const SkeletonGrid = ( {columns = 3, rows = 4} ) => (
    <div className="skeleton-grid">
        {Array.from( {length: rows} ).map( ( _, i ) => (
            <div key={i} className="grid-row">
                {Array.from( {length: columns} ).map( ( _, j ) => (
                    <SkeletonBox key={j} width={`${ 100 / columns }%`} height="80px" />
                ) )}
            </div>
        ) )}
    </div>
);

export default SkeletonBase;
