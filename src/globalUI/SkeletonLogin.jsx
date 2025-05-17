
import React from 'react';
import {SkeletonLine, SkeletonBox} from './SkeletonBase';

const SkeletonLogin = () => (
    <div className="login-skeleton">
        <SkeletonBox width="120px" height="120px" />
        <SkeletonLine width="60%" />
        <SkeletonLine width="80%" />
        <SkeletonLine width="40%" height="40px" />
    </div>
);

export default SkeletonLogin;
