import React, {useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';

import editorStyles from './form-section.module.scss';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
const text = '';

const FormSection = () => {
    const [editorState, setEditorState] = useState(() =>createEditorStateWithText(text));
    
    let editor = useRef(null);


    const onChange = (editorState) => {
        setEditorState(editorState);
    };

    const focus = () => {
        editor.focus();
    };

    return (
        <div>
            <div className={editorStyles.editor} onClick={focus}>
                <Toolbar/>
                <Editor
                    editorState={editorState}
                    onChange={onChange}
                    plugins={plugins}
                    ref={el => editor = el}
                />
            </div>
        </div>
    );
}

export default FormSection
