import React from 'react';

import HeadlinesPicker from '../headline-picker/headline-picker.component';

import headlineStyles from './headlines-button.module.scss';

const HeadlinesButton = ({ onOverrideContent }) => {

    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user

    return (
        <div className={headlineStyles.headlineButtonWrapper}>
            <button 
                onClick={() => onOverrideContent(HeadlinesPicker)} 
                className={headlineStyles.headlineButton}
            >
            H
            </button>
        </div>
    );
}

export default HeadlinesButton