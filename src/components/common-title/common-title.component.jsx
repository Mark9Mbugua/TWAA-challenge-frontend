import React from 'react';

import { Link } from 'react-router-dom';

import titleStyles from './common-title.module.scss';

const CommonTitle = ({ children }) => {
    return (
        <Link to='/articles/' className={titleStyles.titleLink}>{children}</Link>
    );
}

export default CommonTitle
