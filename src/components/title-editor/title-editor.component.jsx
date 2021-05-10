import React, { useRef } from 'react';

import Editor from '@draft-js-plugins/editor';

import titleEditorStyles from './title-editor.module.scss';

const TitleEditor = ({title, onTitleChange}) => {

    let titleEditor = useRef(null);

    const titleFocus = () => {
        titleEditor.focus();
    };

    return (
        <div className={titleEditorStyles.editor} onClick={titleFocus}>
            <Editor
                editorState={title}
                onChange={onTitleChange}
                ref={el => titleEditor = el}
            />
        </div>
    );
}

export default TitleEditor
