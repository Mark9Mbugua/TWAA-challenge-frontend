import React, {useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createUndoPlugin from '@draft-js-plugins/undo';

import HeadlinesButton from '../headlines-button/headlines-button.component';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  } from '@draft-js-plugins/buttons';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/undo/lib/plugin.css';

import editorStyles from './form-section.module.scss';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;;

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const linkifyPlugin = createLinkifyPlugin();

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [toolbarPlugin, emojiPlugin, linkifyPlugin, undoPlugin]


const FormSection = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    
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
                <div className={editorStyles.allTools}>
                    <Toolbar>
                        {
                            (externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <HeadlinesButton {...externalProps} />
                                    <UnorderedListButton {...externalProps} />
                                    <OrderedListButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <CodeBlockButton {...externalProps} />
                                </div>
                            )
                        }
                    </Toolbar>
                    <div>
                        <EmojiSuggestions />
                        <EmojiSelect />
                    </div>
                    <div>
                        <UndoButton />
                        <RedoButton />
                    </div>
                </div>
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
