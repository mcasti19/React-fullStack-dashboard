
import React from 'react';
import {SkeletonGrid, SkeletonLine} from './SkeletonBase';

const SkeletonTable = ( {columns = 5, rows = 6} ) => (
    <div className="table-skeleton">
        <SkeletonLine width="120px" height="24px" />
        <SkeletonGrid columns={columns} rows={rows} />
        <div className="pagination">
            <SkeletonLine width="80px" height="32px" />
            <SkeletonLine width="120px" height="32px" />
            <SkeletonLine width="80px" height="32px" />
        </div>
    </div>
);

export default SkeletonTable;
