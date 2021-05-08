import React from 'react';

import { Link } from 'react-router-dom';

import './common-title.styles.scss';

const CommonTitle = ({ children }) => {
    return (
        <Link className='title-link'>{children}</Link>
    );
}

export default CommonTitle
