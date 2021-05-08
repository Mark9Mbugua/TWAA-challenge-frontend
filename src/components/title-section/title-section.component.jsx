import React from 'react';

import './title-section.styles.scss'

import CommonTitle from '../common-title/common-title.component';

const TitleSection = () => {
    return (
        <div className='title-section-container'>
            <div className='titles-container'>
                <CommonTitle>New Article</CommonTitle>
                <CommonTitle>View Articles</CommonTitle>
            </div>
            <hr />
        </div>
    );
}

export default TitleSection
