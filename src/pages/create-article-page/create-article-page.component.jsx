import React from 'react';

import TitleSection from '../../components/title-section/title-section.component';
import FormSection from '../../components/form-section/form-section.component';

import './create-article-page.styles.scss';

const CreateArticlePage = () => {
    return (
        <div className='create-article-page-container'>
            <div className='create-article-page-wrapper'>
                <TitleSection />
                <FormSection />
            </div>
        </div>
    );
}

export default CreateArticlePage