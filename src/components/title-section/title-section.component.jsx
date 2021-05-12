import React from 'react';

import CommonTitle from '../common-title/common-title.component';

import titlesStyles from './title-section.module.scss';

const TitleSection = () => {
    return (
        <div className={titlesStyles.sectionContainer}>
            <div className={titlesStyles.titlesContainer}>
                <CommonTitle>New Article</CommonTitle>
                <CommonTitle>View Articles</CommonTitle>
            </div>
            <hr />
        </div>
    );
}

export default TitleSection
