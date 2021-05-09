import React, { useState, useRef } from 'react';
import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';

import titleStyles from './article-heading.module.scss';

const ArticleHeading = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    let editor = useRef(null);


    const onChange = (editorState) => {
        setEditorState(editorState);
    };

    const focus = () => {
        editor.focus();
    };

    return (
        <div className={titleStyles.editor} onClick={focus}>
            <Editor
                editorState={editorState}
                onChange={onChange}
                // plugins={plugins}
                ref={el => editor = el}
            />
        </div>
    );
}

export default ArticleHeading
