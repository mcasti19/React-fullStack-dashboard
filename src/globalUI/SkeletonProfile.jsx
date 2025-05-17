
import React from 'react';
import {SkeletonLine, SkeletonBox} from './SkeletonBase';

export const SkeletonProfile = () => (
    <div className="profile-skeleton">
        <div className="header">
            <SkeletonBox width="150px" height="150px" />
            <div className="details">
                <SkeletonLine width="200px" />
                <SkeletonLine width="150px" />
            </div>
        </div>
        <div className="content">
            <SkeletonLine />
            <SkeletonLine width="80%" />
            <SkeletonLine width="60%" />
        </div>
    </div>
);
